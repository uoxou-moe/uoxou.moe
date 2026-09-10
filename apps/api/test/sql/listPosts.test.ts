import { SqliteClient, SqliteMigrator } from "@effect/sql-sqlite-node";
import { describe, expect, it } from "@effect/vitest";
import { DateTime, Effect, Layer, Schema } from "effect";
import { SqlClient } from "effect/unstable/sql";
import { ListPostsRepositorySqlLive } from "~/sql/listPosts";
import { Post } from "~/usecases/entities/post";
import { ListPostsRepository } from "~/usecases/repositories/listPostsRepository";

const migrations = SqliteMigrator.layer({
	loader: SqliteMigrator.fromRecord({
		"0001_create_posts": Effect.gen(function* () {
			const sql = yield* SqlClient.SqlClient;
			yield* sql`
				CREATE TABLE posts (
					id TEXT PRIMARY KEY NOT NULL,
					slug TEXT NOT NULL UNIQUE,
					title TEXT NOT NULL,
					content TEXT NOT NULL,
					created_at TEXT NOT NULL
				) STRICT
			`;
			yield* sql`CREATE INDEX posts_created_at_id ON posts (created_at DESC, id DESC)`;
		}),
	}),
}).pipe(Layer.provideMerge(SqliteClient.layer({ filename: ":memory:" })));

const rows = [1, 2, 3, 4].map((id) => ({
	id: `00000000-0000-4000-8000-${String(id).padStart(12, "0")}`,
	slug: `post-${id}`,
	title: `Post ${id}`,
	content: `Content ${id}`,
	// Posts 2 and 3 share a timestamp to exercise the secondary ordering by id.
	created_at: `2026-09-${id === 3 ? "02" : String(id).padStart(2, "0")}T00:00:00.000Z`,
}));

const database = Layer.effectDiscard(
	Effect.gen(function* () {
		const sql = yield* SqlClient.SqlClient;
		yield* sql`INSERT INTO posts ${sql.insert(rows)}`;
	}),
).pipe(Layer.provideMerge(migrations));

const testLayer = ListPostsRepositorySqlLive.pipe(Layer.provideMerge(database));
const decodeRange = Schema.decodeUnknownSync(ListPostsRepository.Range);

describe("ListPostsRepository with in-memory SQLite", () => {
	// Providing the layer inside each test creates and closes a separate database.
	it.effect.each([
		{ name: "inclusive closed range", range: { _tag: "ClosedRange", start: 1, end: 2 }, ids: [3, 2] },
		{ name: "single position", range: { _tag: "ClosedRange", start: 0, end: 0 }, ids: [4] },
		{ name: "open-ended range", range: { _tag: "OpenEndedRange", start: 1 }, ids: [3, 2, 1] },
		{ name: "suffix range", range: { _tag: "SuffixRange", length: 2 }, ids: [2, 1] },
		{ name: "zero-length suffix", range: { _tag: "SuffixRange", length: 0 }, ids: [] },
		{ name: "oversized suffix", range: { _tag: "SuffixRange", length: 10 }, ids: [4, 3, 2, 1] },
		{ name: "out-of-bounds range", range: { _tag: "ClosedRange", start: 10, end: 20 }, ids: [] },
		{ name: "empty range array", range: [], ids: [] },
		{
			name: "disjoint ranges in result order",
			range: [
				{ _tag: "SuffixRange", length: 1 },
				{ _tag: "ClosedRange", start: 0, end: 0 },
			],
			ids: [4, 1],
		},
		{
			name: "overlapping ranges without duplicates",
			range: [
				{ _tag: "ClosedRange", start: 0, end: 2 },
				{ _tag: "OpenEndedRange", start: 2 },
				{ _tag: "SuffixRange", length: 2 },
			],
			ids: [4, 3, 2, 1],
		},
	])("$name", ({ range, ids }) =>
		Effect.gen(function* () {
			const repository = yield* ListPostsRepository;
			const posts = yield* repository(decodeRange(range));
			expect(posts.map((post) => post.id)).toEqual(ids.map((id) => rows[id - 1]!.id));
		}).pipe(Effect.provide(testLayer)),
	);

	it.effect("decodes stored rows into domain posts", () =>
		Effect.gen(function* () {
			const repository = yield* ListPostsRepository;
			const posts = yield* repository(decodeRange({ _tag: "ClosedRange", start: 0, end: 0 }));
			expect(posts).toHaveLength(1);
			const post = posts[0]!;
			expect(Schema.is(Post)(post)).toBe(true);
			expect({ ...post, createdAt: DateTime.formatIso(post.createdAt) }).toEqual({
				id: rows[3]!.id,
				slug: "post-4",
				title: "Post 4",
				content: "Content 4",
				createdAt: rows[3]!.created_at,
			});
		}).pipe(Effect.provide(testLayer)),
	);

	it.effect("returns no posts from an empty table", () =>
		Effect.gen(function* () {
			const sql = yield* SqlClient.SqlClient;
			const repository = yield* ListPostsRepository;
			yield* sql`DELETE FROM posts`;
			expect(yield* repository(decodeRange({ _tag: "OpenEndedRange", start: 0 }))).toEqual([]);
		}).pipe(Effect.provide(testLayer)),
	);
});
