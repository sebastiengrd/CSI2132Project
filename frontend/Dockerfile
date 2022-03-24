FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /frontend

COPY package.json ./
COPY yarn.lock ./

# Production use node instead of root
# USER node

RUN yarn install --production

COPY . ./

RUN yarn build

CMD [ "yarn", "start" ]
