import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeLeft, makeRight } from "@/infra/shared/either";
import { ilike } from "drizzle-orm";
import { z } from "zod";

const postShortUrlInput = z.object({
  fullUrl: z.string().url(),
  shortUrl: z.string().min(1),
});

type PostShortUrlInput = z.input<typeof postShortUrlInput>;

export async function postShortUrl(input: PostShortUrlInput) {
  const { fullUrl, shortUrl } = postShortUrlInput.parse(input);

  const shortUrlAlreadyExists = await db
    .select({
      shortUrl: schema.shortUrls.shortUrl,
    })
    .from(schema.shortUrls)
    .where(ilike(schema.shortUrls.shortUrl, shortUrl))
    .limit(1);

  if (shortUrlAlreadyExists.length > 0) {
    return makeLeft("Short URL already exists");
  }

  const newShortUrl = {
    fullUrl,
    shortUrl,
    createdAt: new Date(),
  };

  await db.insert(schema.shortUrls).values(newShortUrl);

  return makeRight(newShortUrl);
}
