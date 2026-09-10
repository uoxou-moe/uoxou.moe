import type { Effect } from "effect";
import { Context, Schema } from "effect";
import { OffsetRange } from "~/usecases/entities/common/range";
import { Post } from "~/usecases/entities/post";
import type { InternalError } from "~/usecases/errors/applicationError";

export class ListPostsRepository extends Context.Service<
	ListPostsRepository,
	(range: ListPostsRepository.Range) => Effect.Effect<ListPostsRepository.Result, InternalError>
>()("api/usecases/ListPostsRepository") {}

export namespace ListPostsRepository {
	export const Range = OffsetRange;
	export type Range = Schema.Schema.Type<typeof Range>;

	export const Result = Schema.Array(Post);
	export type Result = Schema.Schema.Type<typeof Result>;
}
