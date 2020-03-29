FROM node:lts-alpine

WORKDIR /usr/crawler-challange

COPY package*.json yarn.* ./
RUN yarn
RUN yarn add sqlite3

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]