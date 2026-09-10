import { Schema } from "effect";

export class ClosedRange extends Schema.Class<ClosedRange>("ClosedRange")(
	Schema.Struct({
		start: Schema.Natural,
		end: Schema.Natural,
	}).check(
		Schema.makeFilter((value) => {
			if (value.end !== undefined && value.start > value.end) {
				return "Start must be less than or equal to end";
			}
			return undefined;
		}),
	),
) {}

export class OpenEndedRange extends Schema.Class<OpenEndedRange>("OpenEndedRange")({
	start: Schema.Natural,
}) {}

export class SuffixRange extends Schema.Class<SuffixRange>("SuffixRange")({
	length: Schema.Natural,
}) {}

export const Range = Schema.Union([
	ClosedRange,
	OpenEndedRange,
	SuffixRange,
	Schema.Array(Schema.Union([ClosedRange, OpenEndedRange, SuffixRange])),
]);

export const OffsetRange = Schema.brand("OffsetRange")(Range);
