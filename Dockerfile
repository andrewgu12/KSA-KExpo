# pull node 9.4 as base
FROM node:9.4.0

# set working directory
WORKDIR /usr/src/app

# copy files in
COPY . ./

RUN rm -rf node_modules/
# run files
RUN npm install

# expoxe port
EXPOSE 8080

# starting task
CMD npm run watch
