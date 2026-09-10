/** Application-defined range unit: zero-based item positions, inclusive end. */
export type ItemRangeResult =
	| { status: 200 | 206; offset: number; limit: number; headers: Record<string, string> }
	| { status: 400 | 416; message: string; headers: Record<string, string> };

/**
 * Resolve a GET request against the filtered collection's total count.
 * The count and fetched rows must come from the same ordered snapshot.
 * Missing/unknown units select the complete collection; callers must not
 * silently truncate that 200 response. HEAD and failed If-Range conditions
 * must be handled by the HTTP handler before calling this function.
 */
export function resolveItemRange(header: string | null, total: number): ItemRangeResult {
	if (!Number.isSafeInteger(total) || total < 0) {
		throw new RangeError("total must be a non-negative safe integer");
	}
	const headers: Record<string, string> = { "Accept-Ranges": "items" };
	const value = header?.trim();
	if (!value || !/^items=/i.test(value)) {
		return { status: 200, offset: 0, limit: total, headers };
	}
	// This API supports one closed, open-ended, or suffix range per request.
	const match = /^items=(\d*)-(\d*)$/i.exec(value);
	if (!match || (!match[1] && !match[2])) {
		return { status: 400, message: "Expected a single items range, e.g. items=0-19", headers };
	}
	const first = match[1] ? Number(match[1]) : undefined;
	const last = match[2] ? Number(match[2]) : undefined;
	if (
		(first !== undefined && !Number.isSafeInteger(first)) ||
		(last !== undefined && !Number.isSafeInteger(last)) ||
		(first !== undefined && last !== undefined && first > last)
	) {
		return { status: 400, message: "Invalid item range bounds", headers };
	}
	const offset = first ?? Math.max(0, total - last!);
	if (total === 0 || offset >= total || (first === undefined && last === 0)) {
		return {
			status: 416,
			message: "Requested item range is not satisfiable",
			headers: { ...headers, "Content-Range": `items */${total}` },
		};
	}
	const end = first === undefined ? total - 1 : Math.min(last ?? total - 1, total - 1);
	return {
		status: 206,
		offset,
		limit: end - offset + 1,
		headers: { ...headers, "Content-Range": `items ${offset}-${end}/${total}` },
	};
}
