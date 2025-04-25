import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import { getShortUrlsRoute } from "./routes/get-short-urls";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createShortUrlRoute } from "./routes/create-short-url";
import { deleteShortUrlRoute } from "./routes/delete-short-url";
import { getShortUrlByShortUrlRoute } from "./routes/get-short-url-by-short-url";
import { incrementAccessCountRoute } from "./routes/increment-access-count";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import { transformSwaggerSchema } from "./transform-swagger-schema";
import fastifySwaggerUi from "@fastify/swagger-ui";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, { origin: "*" });

server.register(fastifyMultipart);
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brev.ly",
      version: "1.0.0",
    },
  },
  transform: transformSwaggerSchema,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(getShortUrlsRoute);
server.register(createShortUrlRoute);
server.register(deleteShortUrlRoute);
server.register(getShortUrlByShortUrlRoute);
server.register(incrementAccessCountRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running! 🚀");
});
