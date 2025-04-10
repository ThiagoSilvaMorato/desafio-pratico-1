import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight } from "@/infra/shared/either";
import { asc, desc } from "drizzle-orm";
import { access } from "fs";
import { z } from "zod";

const getShortUrlsInput = z.object({
  sortBy: z.enum(["createdAt"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

type GetShortUrlsInput = z.input<typeof getShortUrlsInput>;

type GetShortUrlsOutput = {
  shortUrls: {
    fullUrl: string;
    shortUrl: string;
    accessCount: number;
    createdAt: Date;
  }[];
};

export async function getAllShortUrls(
  input: GetShortUrlsInput
): Promise<Either<never, GetShortUrlsOutput>> {
  const { sortBy, sortDirection } = getShortUrlsInput.parse(input);

  const shortUrls = await db
    .select({
      fullUrl: schema.shortUrls.fullUrl,
      shortUrl: schema.shortUrls.shortUrl,
      accessCount: schema.shortUrls.accessCount,
      createdAt: schema.shortUrls.createdAt,
    })
    .from(schema.shortUrls)
    .orderBy((fields) => {
      if (sortBy && sortDirection === "asc") {
        return asc(fields[sortBy]);
      }

      if (sortBy && sortDirection === "desc") {
        return desc(fields[sortBy]);
      }

      return desc(fields.createdAt);
    });

  return makeRight({ shortUrls });
}
