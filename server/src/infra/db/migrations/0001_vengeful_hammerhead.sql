ALTER TABLE "uploads" RENAME TO "short_urls";--> statement-breakpoint
ALTER TABLE "short_urls" DROP CONSTRAINT "uploads_short_url_unique";--> statement-breakpoint
ALTER TABLE "short_urls" ADD CONSTRAINT "short_urls_short_url_unique" UNIQUE("short_url");