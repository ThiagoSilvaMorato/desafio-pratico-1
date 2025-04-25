import { getAllShortUrls } from "@/app/functions/get-short-urls";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getShortUrlsRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/short-url/get-all",
    {
      schema: {
        summary: "Get all URLs encurtadas",
        tags: ["short-url"],
        querystring: z.object({
          sortBy: z.enum(["createdAt"]).optional(),
          sortDirection: z.enum(["asc", "desc"]).optional(),
        }),
        response: {
          200: z.object({
            shortUrls: z.array(
              z.object({
                fullUrl: z.string(),
                shortUrl: z.string(),
                accessCount: z.number(),
                createdAt: z.date(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { sortBy, sortDirection } = request.query;

      const result = await getAllShortUrls({
        sortBy,
        sortDirection,
      });

      const { shortUrls } = unwrapEither(result);

      return reply.status(200).send({ shortUrls });
    }
  );
};
