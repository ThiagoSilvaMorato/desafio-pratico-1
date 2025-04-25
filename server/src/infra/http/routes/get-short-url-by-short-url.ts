import { getShortUrlByShortUrl } from "@/app/functions/get-short-url-by-short-url";
import { isLeft, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getShortUrlByShortUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/short-url/:shortUrl",
    {
      schema: {
        summary: "Get URL encurtada por uma URL encurtada",
        tags: ["short-url"],
        params: z.object({
          shortUrl: z.string().min(1),
        }),
        response: {
          200: z.object({
            shortUrl: z.object({
              fullUrl: z.string(),
              shortUrl: z.string(),
              accessCount: z.number(),
              createdAt: z.date(),
            }),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params;

      const response = await getShortUrlByShortUrl({
        shortUrl,
      });

      if (isLeft(response)) {
        const errorMessage = unwrapEither(response);
        return reply.status(400).send({ message: errorMessage });
      }

      const wrappedResponse = unwrapEither(response);
      return reply.status(200).send({ shortUrl: wrappedResponse.shortUrl });
    }
  );
};
