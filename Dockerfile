# pull node 9.4 as base
FROM node:9.4.0

# set working directory
WORKDIR /usr/src/app

# copy packages.json in
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# install webpack globally
RUN npm install -g webpack

# run files
RUN npm install

# copy everything else in
COPY . /usr/src/app

# expoxe port
EXPOSE 8080

# starting task
CMD npm run watch
