FROM node:alpine
WORKDIR /app
ADD . .
RUN npm i
RUN npm run build
EXPOSE 3003
CMD [ "node", "./build/server.js" ]