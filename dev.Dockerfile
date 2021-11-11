#docker build -t adhityan/atemplate:1.0.0-dev -f dev.Dockerfile .
#docker push adhityan/atemplate:1.0.0-dev
#Run via compose

FROM node:16-alpine
LABEL maintainer="adhityan"
WORKDIR /app

#copy npm login credentials
# COPY .npmrc /app

## If bcrypt is needed
#RUN apk --no-cache add --virtual builds-deps build-base python

#We use npm
COPY package.json /app/
COPY package-lock.json /app/

#install packages
RUN npm ci

#always protect yourself
USER 1000

#source
COPY . /app/

#Any debug environment variables
#ENV DEBUG=GCNats:*

#code should be mounted before this
CMD [ "npm", "run", "start:dev" ]
EXPOSE 9000