import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const shortUrls = pgTable("short_urls", {
  fullUrl: text("full_url").notNull(),
  shortUrl: text("short_url").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
