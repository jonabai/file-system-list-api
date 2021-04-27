# Build sources
FROM node:lts AS builder

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# Build final
FROM node:lts-stretch-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --production

COPY --from=builder /build/config ./config
COPY --from=builder /build/dist ./

RUN mkdir /exposed-folder
RUN seq -f "%04.0f" 9999 | xargs -I "{}" touch /exposed-folder/fake"{}".txt

EXPOSE 3000

ENV ROOT_PATH=/exposed-folder
ENV NODE_ENV=production

VOLUME /exposed-folder

CMD [ "node", "/app/bin/app.js" ]
