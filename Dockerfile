#docker push adhityan/atemplate:1.0.0
#docker build -t adhityan/atemplate:1.0.0 .
#docker run -p 9000:9000 adhityan/atemplate:1.0.0

#STEP 1
FROM node:14-alpine as builder
WORKDIR /code

#copy npm login credentials
#COPY .npmrc /code

## If bcrypt is needed
#RUN apk --no-cache add --virtual builds-deps build-base python

#We use npm
COPY package.json /code/
COPY package-lock.json /app/

#install packages
RUN npm ci

#build
COPY . /code/
RUN npm run build

#STEP FINAL
FROM node:14-alpine
LABEL maintainer="adhityan"

ENV NODE_ENV 'production'

WORKDIR /app
COPY --from=builder /code/dist /app/dist
COPY --from=builder /code/package.json /app
COPY --from=builder /code/package-lock.json /app

#install production packages
RUN npm ci --production

#always protect yourself
USER 1000

CMD [ "npm", "run", "start" ]
EXPOSE 9000