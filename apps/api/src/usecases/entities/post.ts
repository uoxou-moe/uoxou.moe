import { Schema } from "effect";

export const PostId = Schema.String.check(Schema.isUUID()).pipe(Schema.brand("PostId"));
export const PostSlug = Schema.String.check(Schema.isMinLength(1), Schema.isMaxLength(127)).pipe(
	Schema.brand("PostSlug"),
);
export const PostTitle = Schema.String.check(Schema.isMinLength(1), Schema.isMaxLength(255)).pipe(
	Schema.brand("PostTitle"),
);
export const PostContent = Schema.String.pipe(Schema.brand("PostContent"));
export const PostCreatedAt = Schema.DateTimeUtc.pipe(Schema.brand("PostCreatedAt"));
export const Post = Schema.Struct({
	id: PostId,
	slug: PostSlug,
	title: PostTitle,
	content: PostContent,
	createdAt: PostCreatedAt,
}).pipe(Schema.brand("Post"));

export type PostId = Schema.Schema.Type<typeof PostId>;
export type PostSlug = Schema.Schema.Type<typeof PostSlug>;
export type PostTitle = Schema.Schema.Type<typeof PostTitle>;
export type PostContent = Schema.Schema.Type<typeof PostContent>;
export type PostCreatedAt = Schema.Schema.Type<typeof PostCreatedAt>;
export type Post = Schema.Schema.Type<typeof Post>;

export const PublishedPostSummary = Schema.Struct({
	id: PostId,
	slug: PostSlug,
	title: PostTitle,
	content: PostContent,
	createdAt: PostCreatedAt,
}).pipe(Schema.brand("PublishedPostSummary"));

export type PublishedPostSummary = typeof PublishedPostSummary.Type;
