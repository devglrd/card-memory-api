FROM node:11

RUN mkdir /nest-api

WORKDIR /nest-api

COPY ./ /nest-api

RUN npm i && npm i -g pm2 && cp .env.docker .env && npm run build

CMD ["pm2-runtime", "start", "ecosystem.config.js", "-i", "max"]

EXPOSE $APP_PORT
