import { deleteShortUrl } from "@/app/functions/delete-short-url";
import { isLeft, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteShortUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/short-url",
    {
      schema: {
        summary: "Deleta uma URL encurtada",
        tags: ["shortUrl"],
        body: z.object({
          shortUrl: z.string().min(1),
        }),
        response: {
          200: z.any(),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.body;

      const response = await deleteShortUrl({ shortUrl });
      const wrappedResponse = unwrapEither(response);

      if (isLeft(response)) {
        return reply.status(400).send({ message: wrappedResponse });
      }

      return reply.status(204).send();
    }
  );
};
