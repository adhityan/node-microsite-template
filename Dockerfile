#docker build -t adhityan/atemplate:1.0.6 .
#docker run -v "$(pwd)/db":/db:z -p 9000:9000 adhityan/atemplate:1.0.2
#docker push adhityan/atemplate:1.0.6

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
COPY --from=builder /code/dist /app
COPY --from=builder /code/node_modules/jaeger-client/dist/src/jaeger-idl/thrift /thriftrw-idl
COPY --from=builder /code/node_modules/jaeger-client/dist/src/jaeger-idl/thrift /app/jaeger-idl/thrift

USER node    
CMD [ "node", "index.js" ]
EXPOSE 9000