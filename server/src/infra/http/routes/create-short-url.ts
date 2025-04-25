import { postShortUrl } from "@/app/functions/post-short-url";
import { isLeft, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createShortUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/short-url",
    {
      schema: {
        summary: "Criar uma URL encurtada",
        tags: ["short-url"],
        body: z.object({
          fullUrl: z.string().url(),
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
      const { fullUrl, shortUrl } = request.body;

      const response = await postShortUrl({ fullUrl, shortUrl });

      if (isLeft(response)) {
        const errorResponse = unwrapEither(response);
        return reply.status(400).send({ message: errorResponse });
      }

      const wrappedResponse = unwrapEither(response);
      return reply.status(201).send({ shortUrl: wrappedResponse });
    }
  );
};
