# TODO
# https://github.com/oven-sh/bun/issues/4723
# This caused a docker build to be impossible.
# Once this is fixed, we can reconsider bun.

FROM node:lts-alpine as base
WORKDIR /usr/src/app

# installation image -- both for build step and runtime step
FROM base AS install

RUN mkdir -p /temp/dev
RUN mkdir -p /temp/prod

COPY package*.json /temp/dev/
COPY package*.json /temp/prod/

RUN cd /temp/dev && npm install --frozen-lockfile
RUN cd /temp/prod && npm install --frozen-lockfile --omit=dev

# build image
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN ls
RUN ls frontend
RUN npm run build:frontend
RUN npm run build:backend

# runtime image
FROM base as runtime
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist .
COPY --from=prerelease /usr/src/app/package.json .
RUN ls frontend

EXPOSE 3000/tcp
ENV ADDRESS=0.0.0.0 PORT=3000
ENTRYPOINT [ "node", "index.js" ]