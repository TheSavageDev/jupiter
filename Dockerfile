FROM node:alpine
RUN mkdir -p /usr/src/jupiter && chown -R node:node /usr/src/jupiter
WORKDIR /usr/src/jupiter
COPY package.json yarn.lock ./
USER node
RUN yarn install --pure-lockfile
COPY --chown=node:node . .
EXPOSE 5000
