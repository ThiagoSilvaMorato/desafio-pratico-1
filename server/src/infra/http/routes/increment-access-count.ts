import { getAllShortUrls } from "@/app/functions/get-short-urls";
import { incrementAccessCount } from "@/app/functions/increment-access-count";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const incrementAccessCountRoute: FastifyPluginAsyncZod = async (server) => {
  server.patch(
    "/short-url/:shortUrl",
    {
      schema: {
        summary: "Incrementa o contador de acessos em um",
        tags: ["short-url"],
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({
            fullUrl: z.string(),
            shortUrl: z.string(),
            accessCount: z.number(),
            createdAt: z.date(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params;

      const result = await incrementAccessCount({
        shortUrl,
      });

      if (isLeft(result)) {
        const errorMessage = unwrapEither(result);
        return reply.status(400).send({ message: errorMessage });
      }

      const { updatedShortUrl } = unwrapEither(result);

      return reply.status(200).send(updatedShortUrl);
    }
  );
};
