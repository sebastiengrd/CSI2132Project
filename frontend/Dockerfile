FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /frontend

COPY yarn.lock ./

# Production use node instead of root
# USER node


COPY . ./

