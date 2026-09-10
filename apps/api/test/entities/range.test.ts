import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { ClosedRange, OffsetRange, OpenEndedRange, SuffixRange } from "~/usecases/entities/common/range";

const decode = Schema.decodeUnknownSync(OffsetRange);

describe("Tagged ranges", () => {
	it("constructs and round-trips each tagged range", () => {
		const ranges = [
			new ClosedRange({ start: 0, end: 2 }),
			new OpenEndedRange({ start: 1 }),
			new SuffixRange({ length: 2 }),
		];
		const encoded = Schema.encodeSync(OffsetRange)(decode(ranges));
		expect(encoded).toEqual([
			{ _tag: "ClosedRange", start: 0, end: 2 },
			{ _tag: "OpenEndedRange", start: 1 },
			{ _tag: "SuffixRange", length: 2 },
		]);
		expect(decode(encoded)).toEqual(ranges);
	});

	it.each([
		{ _tag: "ClosedRange", start: 2, end: 1 },
		{ _tag: "ClosedRange", start: 0 },
		{ _tag: "OpenEndedRange", start: -1 },
		{ _tag: "SuffixRange", length: 1.5 },
		{ _tag: "UnknownRange", start: 0 },
		{ start: 0 },
		[{ _tag: "ClosedRange", start: 2, end: 1 }],
		[[{ _tag: "OpenEndedRange", start: 0 }]],
		{ _tag: "MultipleRanges", ranges: [] },
	])("rejects invalid range %j without falling back to another variant", (input) => {
		expect(() => decode(input)).toThrow();
	});
	it("preserves closed-range validation on construction", () => {
		expect(() => new ClosedRange({ start: 2, end: 1 })).toThrow();
	});
});
