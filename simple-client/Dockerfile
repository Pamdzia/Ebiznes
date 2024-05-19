FROM node:14 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:14
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build /app
EXPOSE 5000
CMD ["serve", "-s", ".", "-l", "5000"]
