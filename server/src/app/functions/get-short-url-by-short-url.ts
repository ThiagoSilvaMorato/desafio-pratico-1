import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import { ilike } from "drizzle-orm";
import { z } from "zod";

const getShortUrlsInput = z.object({
  shortUrl: z.string(),
});

type GetShortUrlsInput = z.input<typeof getShortUrlsInput>;

type GetShortUrlsOutput = {
  shortUrl: {
    fullUrl: string;
    shortUrl: string;
    accessCount: number;
    createdAt: Date;
  };
};

export async function getShortUrlByShortUrl(
  input: GetShortUrlsInput
): Promise<Either<string, GetShortUrlsOutput>> {
  const { shortUrl } = getShortUrlsInput.parse(input);

  if (!shortUrl) {
    return makeLeft("URL encurtada é obrigatória.");
  }

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

  return makeRight({ shortUrl: shortUrlByShortUrl[0] });
}
