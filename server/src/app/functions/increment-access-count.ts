import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import { ilike } from "drizzle-orm";
import { z } from "zod";

const incrementAccessCountInput = z.object({
  shortUrl: z.string(),
});

type IncrementAccessCountInput = z.input<typeof incrementAccessCountInput>;

type IncrementAccessCountOutput = {
  updatedShortUrl: {
    fullUrl: string;
    shortUrl: string;
    accessCount: number;
    createdAt: Date;
  };
};

export async function incrementAccessCount(
  input: IncrementAccessCountInput
): Promise<Either<string, IncrementAccessCountOutput>> {
  const { shortUrl } = incrementAccessCountInput.parse(input);

  const shortUrlByShortUrl = await db
    .select({
      fullUrl: schema.shortUrls.fullUrl,
      shortUrl: schema.shortUrls.shortUrl,
      accessCount: schema.shortUrls.accessCount,
      createdAt: schema.shortUrls.createdAt,
    })
    .from(schema.shortUrls)
    .where(ilike(schema.shortUrls.shortUrl, shortUrl));

  if (shortUrlByShortUrl.length === 0) {
    return makeLeft("URL encurtada não existe.");
  }

  await db
    .update(schema.shortUrls)
    .set({
      accessCount: shortUrlByShortUrl[0].accessCount + 1,
    })
    .where(ilike(schema.shortUrls.shortUrl, shortUrl));

  const updatedShortUrl = {
    ...shortUrlByShortUrl[0],
    accessCount: shortUrlByShortUrl[0].accessCount + 1,
  };

  return makeRight({ updatedShortUrl: updatedShortUrl });
}
