FROM maven:3-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -B -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/pnube-backend-1.0.0.jar app.jar
EXPOSE ${PORT}
ENTRYPOINT ["java", "-Duser.timezone=America/Argentina/Cordoba", "-jar", "app.jar"]
