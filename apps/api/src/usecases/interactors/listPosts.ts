import { Effect, Layer } from "effect";
import { OffsetRange, OpenEndedRange } from "~/usecases/entities/common/range";
import { InternalError } from "~/usecases/errors/applicationError";
import { ListPosts } from "~/usecases/listPosts";
import { ListPostsRepository } from "~/usecases/repositories/listPostsRepository";

export const ListPostsLive = Layer.effect(ListPosts)(
	Effect.gen(function* () {
		const repository = yield* ListPostsRepository;

		return Effect.fn("listPosts")(function* (options?: ListPosts.Options) {
			const range =
				options?.range ?? (yield* OffsetRange.makeEffect(new OpenEndedRange({ start: 0 })).pipe(Effect.orDie));

			return yield* repository(range).pipe(
				Effect.mapError((error) => {
					return new InternalError({
						message: "Failed to list posts because of a repository error",
						cause: error,
					});
				}),
			);
		});
	}),
);
