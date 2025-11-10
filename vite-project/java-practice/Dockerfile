FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY . .

RUN javac Main.java

CMD ["java", "Main"]

#docker build -t java-app
#docker run -d -p 8080:8080 --name hello-world --env-file .env java-app