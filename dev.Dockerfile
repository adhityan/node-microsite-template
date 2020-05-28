#docker build -t adhityan/corona-backend-dev -f dev.Dockerfile .
#docker run -v "$(pwd)":/app:ro -p 9000:9000 adhityan/corona-backend-dev

FROM node:12-alpine
LABEL maintainer="adhityan"
LABEL trademark="Gamechange Solutions"
WORKDIR /app

#copy npm login credentials
COPY .npmrc /app

#We use yarn
COPY package.json /app/
COPY yarn.lock /app/

#install packages
RUN yarn install --frozen-lockfile

#code should be mounted before this
CMD [ "yarn", "start:dev" ]
EXPOSE 9000