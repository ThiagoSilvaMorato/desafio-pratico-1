FROM node:20.18 AS base

RUN npm i -g pnpm

FROM base AS dependencies

RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM base AS build

WORKDIR /usr/src/app

COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod

FROM cgr.dev/chainguard/node:latest AS deploy

USER 1000

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 3333

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT:-3333}/health || exit 1

CMD ["dist/server.mjs"]