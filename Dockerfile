FROM node:15.9.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@4.0.2 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
