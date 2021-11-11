#https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:14

RUN npm install -g p5-cli

WORKDIR /usr/src/

COPY . .

WORKDIR /usr/src/sketch

CMD [ "p5", "serve", "--port=8080" ]