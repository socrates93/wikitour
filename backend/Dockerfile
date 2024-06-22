FROM node:18-alpine

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma migrate dev --name init

EXPOSE 3000

CMD ["npm", "run", "start"]
