FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5555

CMD ["npm", "run", "preview"]

#docker build -t kanban-img
#docker run -d -p 3000:5555 --name kanban-container --env-file .env kanban-img