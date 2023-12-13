import {
  boolean,
  integer,
  pgTable,
  serial,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  storageKey: varchar("storage_key", { length: 256 }).unique().notNull(),
  width: smallint("width").notNull(),
  height: smallint("height").notNull(),
  tweetUrl: varchar("tweet_url", { length: 256 }).notNull(),
  authorName: varchar("author_name", { length: 256 }).notNull(),
  authorHandle: varchar("author_handle", { length: 256 }).notNull(),
  date: timestamp("date").notNull(),
});
export type IrasutoPhoto = typeof photos.$inferSelect;
export type NewIrasutoPhoto = typeof photos.$inferInsert;

export const shortLinks = pgTable("short_links", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 256 }).unique().notNull(),
  url: varchar("url", { length: 4096 }).notNull(),
  updated: timestamp("updated").notNull().defaultNow(),
  isJoulev: boolean("is_joulev").notNull().default(false),
});
export type ShortLink = typeof shortLinks.$inferSelect;
export type NewShortLink = typeof shortLinks.$inferInsert;

export const codeSnippets = pgTable("code_snippets", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 12 }).unique().notNull(),
  language: varchar("language", { length: 16 }).notNull(),
  code: varchar("code", { length: 65_536 }).notNull(),
  shikiOutput: varchar("shiki_output", { length: 10_485_760 }).notNull(),
});
export type CodeSnippet = typeof codeSnippets.$inferSelect;
export type NewCodeSnippet = typeof codeSnippets.$inferInsert;

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 512 }).unique().notNull(),
  viewCount: integer("view_count").notNull().default(0),
});
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
