#docker build -t adhityan/corona-backend .
#docker run -p 9000:9000 adhityan/corona-backend

#STEP 1
FROM node:12-alpine as builder
WORKDIR /code

#copy npm login credentials
COPY .npmrc /code

#We use yarn
COPY package.json /code/
COPY yarn.lock /code/

#install packages
RUN yarn install --frozen-lockfile

#build
COPY . /code/
RUN yarn build

#STEP FINAL
FROM node:12-alpine
LABEL maintainer="adhityan"
LABEL trademark="Gamechange Solutions"

WORKDIR /app
COPY --from=builder /code/package.json /app
COPY --from=builder /code/dist /app

CMD [ "node", "index.js" ]
EXPOSE 9000