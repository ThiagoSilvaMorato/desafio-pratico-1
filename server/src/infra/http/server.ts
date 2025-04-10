import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import { getShortUrlsRoute } from "./routes/get-short-urls";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createShortUrlRoute } from "./routes/create-short-url";
import { deleteShortUrlRoute } from "./routes/delete-short-url";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, { origin: "*" });

server.register(getShortUrlsRoute);
server.register(createShortUrlRoute);
server.register(deleteShortUrlRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running! 🚀");
});
