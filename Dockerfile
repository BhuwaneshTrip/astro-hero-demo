FROM oven/bun:1.2.22 AS build

WORKDIR /app

COPY package.json bun.lock turbo.json tsconfig.json bts.jsonc ./
COPY apps ./apps
COPY packages ./packages

RUN bun install --frozen-lockfile
RUN bun run build -- --filter=web

FROM node:20-alpine AS runtime

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080

WORKDIR /app

COPY --from=build /app/apps/web/dist ./dist

EXPOSE 8080

CMD ["node", "./dist/server.mjs"]