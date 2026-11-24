FROM node:26-slim@sha256:abe7e5a82b61a8ef67b315b85497c9e65173387ccf2f4a029248184b8e020be5 AS build
RUN npm install -g pnpm@12.9.0

WORKDIR /build

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
ENV ASTRO_TELEMETRY_DISABLED=1
RUN pnpm build

FROM nginx:1.31-alpine@sha256:713fc2ebfd92e8217db451477182ee91944b123d2b1ee9fd5a8c6e91ca6c3a11
COPY --from=build /build/dist /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
