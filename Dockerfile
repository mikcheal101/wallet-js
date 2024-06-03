FROM node

WORKDIR /dist/

COPY package.json .
RUN yarn install
COPY ../ .

CMD npx nodemon