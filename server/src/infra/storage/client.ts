import { env } from "@/env";
import { S3Client } from "@aws-sdk/client-s3";

//TODO: Configurar o cloudflare
export const r2 = new S3Client({
  region: "auto",
  endpoint:
    env.CLOUDFLARE_BUCKET_URL ?? `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  forcePathStyle: true,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});
