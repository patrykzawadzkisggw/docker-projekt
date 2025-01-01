FROM golang:1.20-alpine

RUN apk add --no-cache docker-cli

WORKDIR /app

COPY main.go .

RUN go build -o app main.go

EXPOSE 8080

CMD ["./app"]
