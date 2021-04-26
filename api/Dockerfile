FROM node:15.14.0-slim

ADD package-lock.json /app/

ADD package.json /app/

WORKDIR /app

RUN npm install

ADD . /app

EXPOSE 3001

CMD ["npm", "start"]