FROM node:alpine as builder

WORKDIR /build

RUN corepack enable pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm i

COPY . .
RUN pnpm build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /build/build /usr/share/nginx/html
