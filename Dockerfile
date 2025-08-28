FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY . . 

EXPOSE 5000 8080

CMD ["npm", "start"]
