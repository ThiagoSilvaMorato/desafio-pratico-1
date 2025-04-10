import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const shortUrls = pgTable("short_urls", {
  fullUrl: text("full_url").notNull(),
  shortUrl: text("short_url").notNull().unique(),
  accessCount: integer("access_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
