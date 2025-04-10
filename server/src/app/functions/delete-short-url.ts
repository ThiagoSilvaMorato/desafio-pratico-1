import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeLeft, makeRight } from "@/infra/shared/either";
import { ilike } from "drizzle-orm";
import { z } from "zod";

const deleteShortUrlInput = z.object({
  shortUrl: z.string().min(1),
});

type deleteShortUrlInput = z.input<typeof deleteShortUrlInput>;

export async function deleteShortUrl(input: deleteShortUrlInput) {
  const { shortUrl } = deleteShortUrlInput.parse(input);

  const deletedShortUrl = await db
    .delete(schema.shortUrls)
    .where(ilike(schema.shortUrls.shortUrl, shortUrl))
    .returning();

  if (deletedShortUrl.length === 0) {
    return makeLeft("Short URL does not exists");
  }

  return makeRight("Short URL deleted successfully.");
}
