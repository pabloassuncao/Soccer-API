FROM node:16-alpine

WORKDIR /backend

COPY package.json ./

COPY packages.npm ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
