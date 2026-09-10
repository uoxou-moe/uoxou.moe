import { Context, Schema, type Effect } from "effect";
import { OffsetRange } from "~/usecases/entities/common/range";
import { Post } from "~/usecases/entities/post";
import type { InternalError, InvalidInputError, UnsatisfiableRangeError } from "~/usecases/errors/applicationError";

export class ListPosts extends Context.Service<
	ListPosts,
	(
		options?: ListPosts.Options,
	) => Effect.Effect<ListPosts.Result, InvalidInputError | UnsatisfiableRangeError | InternalError>
>()("api/usecases/ListPosts") {}

export namespace ListPosts {
	export class Options extends Schema.Class<Options>("ListPosts.Options")({
		range: Schema.optional(OffsetRange),
	}) {}

	export const Result = Schema.Array(Post);
	export type Result = Schema.Schema.Type<typeof Result>;
}
