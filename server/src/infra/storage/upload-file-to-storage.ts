import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import { env } from "@/env";
import { Upload } from "@aws-sdk/lib-storage";
import { z } from "zod";
import { r2 } from "./client";

const uploadFileToStorageInput = z.object({
  folder: z.enum(["csvs"]),
  contentStream: z.instanceof(Readable),
});

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageInput>;

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
  const { folder, contentStream } = uploadFileToStorageInput.parse(input);

  const uniqueFileName = `${folder}/short-urls-csv-${randomUUID()}.csv`;

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFileName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: "text/csv",
    },
  });

  await upload.done();

  console.log(env.CLOUDFLARE_PUBLIC_URL);

  return {
    key: uniqueFileName,
    url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
  };
}
