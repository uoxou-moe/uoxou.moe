CREATE TABLE posts (
    id TEXT PRIMARY KEY NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    -- Write canonical UTC ISO 8601 strings, e.g. 2026-09-10T00:00:00.000Z.
    created_at TEXT NOT NULL
) STRICT;

CREATE INDEX posts_created_at_id ON posts (created_at DESC, id DESC);
