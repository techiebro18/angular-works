# Build Step
FROM node:14-alpine3.15 AS builder

WORKDIR /app

COPY package.json ./

RUN npm i -D typescript@4.6.4

RUN npm install

COPY . /app

ARG BUILD_COMMAND=build:dev-ssr

RUN npm run $BUILD_COMMAND

#Final Step
FROM node:14.18.0-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/dist

EXPOSE 4000

# Serve the app
CMD [ "node", "dist/private-sellers-spa/server/main.js" ]