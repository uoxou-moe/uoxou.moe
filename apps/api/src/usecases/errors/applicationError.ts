import { Data } from "effect";

export class InternalError extends Data.TaggedError("InternalError")<{
	readonly message: string;
	readonly cause: unknown;
}> {}

export class ResourceNotExistsError extends Data.TaggedError("ResourceNotExistsError")<{
	readonly message: string;
	readonly cause: unknown;
}> {}

export class InvalidInputError extends Data.TaggedError("InvalidInputError")<{
	readonly message: string;
	readonly cause: unknown;
}> {}

export class UnsatisfiableRangeError extends Data.TaggedError("UnsatisfiableRangeError")<{
	readonly message: string;
	readonly cause: unknown;
}> {}
