import { postShortUrl } from "@/app/functions/post-short-url";
import { isLeft, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createShortUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/short-url",
    {
      schema: {
        summary: "Create a short URL",
        tags: ["shortUrl"],
        body: z.object({
          fullUrl: z.string().url(),
          shortUrl: z.string().min(1),
        }),
        response: {
          200: z.any(),
        },
      },
    },
    async (request, reply) => {
      const { fullUrl, shortUrl } = request.body;

      const response = await postShortUrl({ fullUrl, shortUrl });
      const wrappedResponse = unwrapEither(response);

      if (isLeft(response)) {
        return reply.status(400).send({ message: wrappedResponse });
      }

      return reply.status(200).send(wrappedResponse);
    }
  );
};
