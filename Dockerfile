# Pull base Node image
FROM node:10.3.0
# set working directory to API
WORKDIR /api
# Copy everything over into API
ADD . /api
# Install all dependencies
RUN npm install -g yarn && yarn
# Open the port
EXPOSE 8080
# Start!
CMD npm start
