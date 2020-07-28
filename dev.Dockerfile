#docker build -t adhityan/atemplate-dev -f dev.Dockerfile .
#Run via compose

FROM node:14-alpine
LABEL maintainer="adhityan"
LABEL trademark="Gamechange Solutions"
WORKDIR /app

#copy npm login credentials
# COPY .npmrc /app

## If bcrypt is needed
#RUN apk --no-cache add --virtual builds-deps build-base python

#We use yarn
COPY package.json /app/
COPY yarn.lock /app/

#install packages
RUN yarn install --frozen-lockfile

#always protect yourself
USER node    

#code should be mounted before this
CMD [ "yarn", "start:dev" ]
EXPOSE 9000