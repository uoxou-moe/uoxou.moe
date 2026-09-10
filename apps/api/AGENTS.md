# Effect

This workspace uses Effect and @effect/sql-d1 4.0.0-rc.112. The repository root
uses Effect v3; do not use that package's APIs for this workspace or upgrade it
as part of API work.

Before writing Effect code, read `apps/api/node_modules/effect/AGENTS.md`
completely (relative to the repository root), and follow its relevant links.
For API details, inspect `apps/api/node_modules/effect/src` and
`apps/api/node_modules/@effect/sql-d1/src` for the installed versions.

The use-case repository owns its contract. Keep SQL implementation dependencies
in `src/sql`; do not make use cases depend on SQL models or D1 services.
