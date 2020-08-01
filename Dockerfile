#docker push adhityan/atemplate:1.0.7
#docker build -t adhityan/atemplate:1.0.7 .
#docker run -v "$(pwd)/db":/app/db:z -p 9000:9000 adhityan/atemplate:1.0.7

#STEP 1
FROM node:14-alpine as builder
WORKDIR /code

#copy npm login credentials
#COPY .npmrc /code

#We use yarn
COPY package.json /code/
COPY yarn.lock /code/

## If bcrypt is needed
#RUN apk --no-cache add --virtual builds-deps build-base python

#install packages
RUN yarn install --frozen-lockfile

#build
COPY . /code/
RUN yarn build

#STEP FINAL
FROM node:14-alpine
LABEL maintainer="adhityan"
LABEL trademark="Gamechange Solutions"

ENV NODE_ENV 'production'

WORKDIR /app
COPY --from=builder /code/dist /app/dist
COPY --from=builder /code/yarn.lock /app
COPY --from=builder /code/package.json /app

#install production packages
RUN yarn install --production --frozen-lockfile

#always protect yourself
USER 1000

CMD [ "yarn", "start" ]
EXPOSE 9000