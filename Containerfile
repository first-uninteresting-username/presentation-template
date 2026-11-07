FROM node:26-slim AS build
RUN npm install -g pnpm@12.9.0

WORKDIR /build

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
ENV ASTRO_TELEMETRY_DISABLED=1
RUN pnpm build

FROM nginx:1.31-alpine
COPY --from=build /build/dist /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
