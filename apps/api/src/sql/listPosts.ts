import { Effect, Layer, Match, Schema } from "effect";
import { SqlClient, SqlSchema, type Statement } from "effect/unstable/sql";
import { Post } from "~/usecases/entities/post";
import { InternalError } from "~/usecases/errors/applicationError";
import { ListPostsRepository } from "~/usecases/repositories/listPostsRepository";

// Decode the persisted UTC ISO string into the branded DateTime.Utc.
const PostRow = Schema.toCodecJson(Post);

export const ListPostsRepositorySqlLive = Layer.effect(ListPostsRepository)(
	Effect.gen(function* () {
		const sql = yield* SqlClient.SqlClient;
		const findAll = SqlSchema.findAll({
			Request: ListPostsRepository.Range,
			Result: PostRow,
			execute: (range) => {
				const ranges = "_tag" in range ? [range] : range;
				if (ranges.length === 0) return Effect.succeed([]);
				if (ranges.length === 1) {
					return Match.value(ranges[0]!).pipe(
						Match.tagsExhaustive({
							ClosedRange: ({ start, end }) => sql`
								SELECT id, slug, title, content, created_at AS "createdAt"
								FROM posts ORDER BY created_at DESC, id DESC
								LIMIT ${end - start + 1} OFFSET ${start}
							`,
							OpenEndedRange: ({ start }) => sql`
								SELECT id, slug, title, content, created_at AS "createdAt"
								FROM posts ORDER BY created_at DESC, id DESC
								LIMIT -1 OFFSET ${start}
							`,
							SuffixRange: ({ length }) => sql`
								SELECT id, slug, title, content, created_at AS "createdAt"
								FROM (
									SELECT id, slug, title, content, created_at
									FROM posts ORDER BY created_at ASC, id ASC LIMIT ${length}
								)
								ORDER BY created_at DESC, id DESC
							`,
						}),
					);
				}
				const conditions = ranges.map((selection) =>
					Match.value(selection).pipe(
						Match.tagsExhaustive({
							ClosedRange: ({ start, end }): Statement.Fragment => sql`position BETWEEN ${start} AND ${end}`,
							OpenEndedRange: ({ start }): Statement.Fragment => sql`position >= ${start}`,
							SuffixRange: ({ length }): Statement.Fragment => sql`position >= total - ${length}`,
						}),
					),
				);
				// Keep suffix counts and selected rows in the same snapshot.
				return sql`
					WITH ranked_posts AS (
						SELECT id, slug, title, content, created_at,
							ROW_NUMBER() OVER (ORDER BY created_at DESC, id DESC) - 1 AS position,
							COUNT(*) OVER () AS total
						FROM posts
					)
					SELECT id, slug, title, content, created_at AS "createdAt"
					FROM ranked_posts
					WHERE ${sql.or(conditions)}
					ORDER BY position
				`;
			},
		});

		return Effect.fn("ListPostsRepository.list")(function* (range: ListPostsRepository.Range) {
			return yield* findAll(range).pipe(
				Effect.mapError((cause) => new InternalError({ message: "Failed to list posts", cause })),
			);
		});
	}),
);
