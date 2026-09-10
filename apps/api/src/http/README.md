# Item ranges

The list endpoint will use the application-defined `items` range unit:

```http
GET /api/posts
Range: items=20-39
```

```http
HTTP/1.1 206 Partial Content
Accept-Ranges: items
Content-Range: items 20-39/100
```

`resolveItemRange(rangeHeader, total)` resolves zero-based inclusive positions
into numeric `offset` and `limit` for the use case. It supports a single closed
range (`items=20-39`), open range (`items=20-`), or suffix (`items=-20`).
Malformed, reversed, unsafe, and multiple ranges return 400. A valid range with
no matching items returns 416 and `Content-Range: items */100`, not 404.
The response body for 206 is the requested array of items.

Missing Range headers and unknown units select the full collection with 200;
an empty collection then returns `[]`. An explicit range on an empty collection
returns 416. The HTTP handler must process preconditions first and ignore Range
for methods other than GET. If it supports If-Range, a failed condition selects
the full response. See https://www.rfc-editor.org/rfc/rfc9110.html#section-14.

The Worker allows Range in CORS preflight and exposes Accept-Ranges and
Content-Range to the allowed frontend origin.

Integration remains pending: there is currently no posts HTTP route or database
repository implementation. Obtain the filtered count and ordered rows from a
consistent snapshot, pass the count to this adapter, and use its status and
headers on the response. Do not pass a zero-length selection to the repository.
The current use-case limit is 127; larger selections (including full responses)
need repository batching or an explicitly defined range-size policy before
connecting this adapter. Never silently truncate a full 200 response.
