import { pgTable, serial, smallint, timestamp, varchar } from "drizzle-orm/pg-core";

export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 256 }).unique().notNull(),
  width: smallint("width").notNull(),
  height: smallint("height").notNull(),
  tweetUrl: varchar("tweet_url", { length: 256 }).notNull(),
  authorName: varchar("author_name", { length: 256 }).notNull(),
  authorHandle: varchar("author_handle", { length: 256 }).notNull(),
  date: timestamp("date").notNull().defaultNow(),
});
export type IrasutoPhoto = typeof photos.$inferSelect;
export type NewIrasutoPhoto = typeof photos.$inferInsert;
