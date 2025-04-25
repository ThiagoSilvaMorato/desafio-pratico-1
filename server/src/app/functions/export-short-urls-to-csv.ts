import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/infra/shared/either";
import { convertToCsv } from "@/utils/convert-to-csv";
import { InvalidFileFormatError } from "./errors/invalid-file-format";
import { desc } from "drizzle-orm";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { createReadStream } from "node:fs";
import { Readable } from "node:stream";

// const uploadShortUrlCsvInput = z.object({
//   contentStream: z.instanceof(Readable),
// });

// type UploadShortUrlCsvInput = z.input<typeof uploadShortUrlCsvInput>;

// const allowedMimeTypes = ["text/csv", "application/csv", "text/plain"];

export async function uploadShortUrlCsv(): Promise<Either<never, { url: string }>> {
  // const { contentStream, contentType, fileName } = uploadShortUrlCsvInput.parse(input);

  const shortUrls = await db
    .select({
      fullUrl: schema.shortUrls.fullUrl,
      shortUrl: schema.shortUrls.shortUrl,
      accessCount: schema.shortUrls.accessCount,
      createdAt: schema.shortUrls.createdAt,
    })
    .from(schema.shortUrls)
    .orderBy((fields) => {
      return desc(fields.createdAt);
    });

  const contentStream = Readable.from(Buffer.from(convertToCsv(shortUrls)));

  const { key, url } = await uploadFileToStorage({
    folder: "csvs",
    contentStream,
  });

  await db.insert(schema.uploads).values({
    name: `short-urls-csv-${Date.now()}.csv`,
    remoteKey: key,
    remoteUrl: url,
  });

  return makeRight({ url });
}
