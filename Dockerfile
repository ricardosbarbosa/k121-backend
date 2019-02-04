FROM node:10-alpine

WORKDIR /usr/app/backend
COPY . .

RUN yarn

EXPOSE 3001
CMD [ "yarn", "start"]