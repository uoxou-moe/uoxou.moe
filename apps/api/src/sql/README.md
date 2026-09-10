# D1 repositories

`ListPostsRepositoryD1Live` implements the use-case repository with Effect
`4.0.0-rc.112`, `SqlClient`, and `SqlSchema.findAll`. Supply the database at the
application composition boundary:

```ts
ListPostsRepositoryD1Live.pipe(Layer.provide(makeDatabaseLayer(env.DB)));
```

The posts table is defined in `../../migrations/0001_create_posts.sql`. Add a D1
binding to Wrangler before applying migrations with Wrangler or connecting this
layer to a Worker. The current Worker only serves system routes; the posts
repository is not wired into HTTP yet. No remote database has been created or
migrated by this implementation.

## Storage and query contract

- Persist `created_at` as canonical UTC ISO strings with milliseconds, for example
  `2026-09-10T00:00:00.000Z`, so text ordering matches chronological ordering.
- `Schema.toCodecJson(Post)` validates each row and converts the date string into
  the existing branded `DateTime.Utc`. SQL aliases `created_at` to `createdAt`.
- All posts are returned in `created_at DESC, id DESC` order. There is currently
  no publication-state field or publication filter in this repository contract.
- Ranges use zero-based positions with inclusive ends. An open range selects all
  remaining posts; a suffix selects the last N posts in the same descending order.
- Multiple ranges use an array of tagged single ranges. They select their union,
  deduplicated and in collection order. Nested arrays are not accepted.
- Empty selections and out-of-bounds ranges return `[]`. HTTP range statuses are
  handled separately; the repository does not return a total count.
- SQL and schema failures become `InternalError`, preserving the original cause.

Single ranges use the ordering index with LIMIT/OFFSET. A suffix scans the index
in reverse and reorders only the selected rows. An array with one range follows
the same path. Large offsets still require skipping the preceding index entries.
Multiple ranges use a window query to compute positions and total count in one
statement, avoiding separate snapshots. That path processes the full collection.

## Verification

`npm test --workspace @uoxou/api` runs the real migration and repository against
an isolated, in-memory Miniflare D1 database. Coverage includes ordering, all
range forms, overlap, empty results, date/brand decoding, corrupt rows, and SQL
failures. No Cloudflare credentials are required.
