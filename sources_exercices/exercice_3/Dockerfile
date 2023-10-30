FROM node:lts-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /var/www/html

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]
