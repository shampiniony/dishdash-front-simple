FROM ubuntu:latest

COPY . .
EXPOSE 9000

RUN chmod 777 main

CMD ["./main"]
