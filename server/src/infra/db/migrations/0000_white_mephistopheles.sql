CREATE TABLE "uploads" (
	"full_url" text NOT NULL,
	"short_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "uploads_short_url_unique" UNIQUE("short_url")
);
