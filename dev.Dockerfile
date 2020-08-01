#docker build -t adhityan/atemplate:1.0.7-dev -f dev.Dockerfile .
#docker push adhityan/atemplate:1.0.7-dev
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

COPY . /app/

#always protect yourself
USER 1000    

#code should be mounted before this
CMD [ "yarn", "start:dev" ]
EXPOSE 9000