FROM node:26-slim@sha256:5adad64f9a1fca2d51972caa65983634c8a774eb300d72b20f7f2a0f60368072 AS build
RUN npm install -g pnpm@12.9.0

WORKDIR /build

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
ENV ASTRO_TELEMETRY_DISABLED=1
RUN pnpm build

FROM nginx:1.31-alpine@sha256:fed7e14be83cbd2661a75cdc5b872d936cf155d46c327084d30b8df19ae88d72
COPY --from=build /build/dist /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
