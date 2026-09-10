import { expect, layer } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FastCheck } from "effect/testing";
import { Post } from "~/usecases/entities/post";
import { ListPostsLive } from "~/usecases/interactors/listPosts";
import { ListPosts } from "~/usecases/listPosts";
import { ListPostsRepository } from "~/usecases/repositories/listPostsRepository";

const arbitrary = Schema.toArbitrary(Post)(FastCheck);

const mockListPostsRepository = Layer.succeed(ListPostsRepository, () =>
	Effect.succeed(FastCheck.sample(arbitrary, 10)),
);

layer(ListPostsLive.pipe(Layer.provide(mockListPostsRepository)))("ユースケース ┊︎ listPosts", (it) => {
	it.effect("正常系 ┊︎ Post のリストを返す", () =>
		Effect.gen(function* () {
			const listPosts = yield* ListPosts;
			const result = yield* listPosts();

			expect(result).toEqual(expect.any(Array<Post>));
		}),
	);
});
