From node:latest


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
RUN npm run build

EXPOSE 3000

CMD [ "node", "build/index.js" ]