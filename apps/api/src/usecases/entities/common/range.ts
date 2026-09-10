import { Schema } from "effect";

export class ClosedRange extends Schema.TaggedClass<ClosedRange>()(
	"ClosedRange",
	Schema.Struct({
		start: Schema.Natural,
		end: Schema.Natural,
	}).check(
		Schema.makeFilter((value) => {
			if (value.start > value.end) {
				return "Start must be less than or equal to end";
			}
			return undefined;
		}),
	),
) {}

export class OpenEndedRange extends Schema.TaggedClass<OpenEndedRange>()("OpenEndedRange", {
	start: Schema.Natural,
}) {}

export class SuffixRange extends Schema.TaggedClass<SuffixRange>()("SuffixRange", {
	length: Schema.Natural,
}) {}

export const SingleRange = Schema.Union([ClosedRange, OpenEndedRange, SuffixRange]);

export const Range = Schema.Union([ClosedRange, OpenEndedRange, SuffixRange, Schema.Array(SingleRange)]);

export const OffsetRange = Schema.brand("OffsetRange")(Range);
