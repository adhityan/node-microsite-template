#docker build -t adhityan/ATEMPLATE-dev -f dev.Dockerfile .
#docker run -v "$(pwd)":/app:ro -p 9000:9000 adhityan/ATEMPLATE-dev

FROM node:14-alpine
LABEL maintainer="adhityan"
LABEL trademark="Gamechange Solutions"
WORKDIR /app

#copy npm login credentials
COPY .npmrc /app

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