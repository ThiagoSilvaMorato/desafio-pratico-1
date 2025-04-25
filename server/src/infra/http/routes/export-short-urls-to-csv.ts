import { uploadShortUrlCsv } from "@/app/functions/export-short-urls-to-csv";
import { getAllShortUrls } from "@/app/functions/get-short-urls";
import { isLeft, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportShortUrlsToCsvRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/short-url/export-csv",
    {
      schema: {
        summary: "Cria um CSV com todas as URLs encurtadas",
        tags: ["short-url"],
        response: {
          200: z.object({
            url: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const response = await uploadShortUrlCsv();

      const { url } = unwrapEither(response);

      return reply.status(200).send({ url });
    }
  );
};
