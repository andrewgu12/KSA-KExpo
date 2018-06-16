# Pull base Node image
FROM node:10.3.0
# set working directory to API
WORKDIR /api
# # Copy everything over into API
# ADD . /api
COPY package.json /api
COPY package-lock.json /api
COPY yarn.lock /api


# Install all dependencies
RUN npm cache clean --force && npm install -g yarn && yarn

# COPY db/init.sql /docker-entrypoint-initdb.d/
COPY . /api

# Create database and run any migrations
# RUN npm run db:migrate-up

# Open the port
EXPOSE 3000
# Start!
CMD npm start
