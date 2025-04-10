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

  const shortUrlExists = await db
    .select({
      shortUrl: schema.shortUrls.shortUrl,
    })
    .from(schema.shortUrls)
    .where(ilike(schema.shortUrls.shortUrl, shortUrl))
    .limit(1);

  if (shortUrlExists.length === 0) {
    return makeLeft("URL encurtada não existe.");
  }

  await db.delete(schema.shortUrls).where(ilike(schema.shortUrls.shortUrl, shortUrl));

  return makeRight("URL encurtada deletada com sucesso.");
}
