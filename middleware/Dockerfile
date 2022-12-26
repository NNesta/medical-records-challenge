# setup docker file for the project
FROM  node:16-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 4000

CMD ["node", "src/index.js"]
