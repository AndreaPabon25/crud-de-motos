FROM node:18

WORKDIR /app

RUN npm install -g serve

COPY . .

EXPOSE 5173

CMD ["serve", "-s", ".", "-l", "5173"]
