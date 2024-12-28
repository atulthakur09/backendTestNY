FROM node:alpine3.18
WORKDIR /app
COPY npm install
COPY . .
EXPOSE 3777
CMD [ "npm", "start", "run" ]