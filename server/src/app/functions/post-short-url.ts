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

  const validationErrors: string[] = [];

  const validCharsRegex = /^[a-z0-9-]+$/;
  if (!validCharsRegex.test(shortUrl)) {
    validationErrors.push("Apenas letras minúsculas, números e hífens são permitidos");
  }

  const firstCharRegex = /^[a-z]/;
  if (!firstCharRegex.test(shortUrl)) {
    validationErrors.push("Deve começar com uma letra minúscula");
  }

  const lastCharRegex = /[a-z0-9]$/;
  if (!lastCharRegex.test(shortUrl)) {
    validationErrors.push("Deve terminar com uma letra minúscula ou número");
  }

  if (shortUrl.includes("--")) {
    validationErrors.push("Não pode ter hífens consecutivos");
  }

  if (validationErrors.length > 0) {
    return makeLeft(validationErrors.join(". "));
  }

  const shortUrlAlreadyExists = await db
    .select({
      shortUrl: schema.shortUrls.shortUrl,
    })
    .from(schema.shortUrls)
    .where(ilike(schema.shortUrls.shortUrl, shortUrl))
    .limit(1);

  if (shortUrlAlreadyExists.length > 0) {
    return makeLeft("Essa URL encurtada já existe.");
  }

  const newShortUrl = {
    fullUrl,
    shortUrl,
    accessCount: 0,
    createdAt: new Date(),
  };

  await db.insert(schema.shortUrls).values(newShortUrl);

  return makeRight(newShortUrl);
}
