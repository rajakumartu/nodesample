FROM node:8.6-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install -quiet

COPY . .

#VOLUME ["/var/www/example.com/api"]

EXPOSE 3000
CMD ["npm", "start"]