FROM node:lts-alpine

WORKDIR /usr/crawler-challange

COPY package*.json yarn.* ./
RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]