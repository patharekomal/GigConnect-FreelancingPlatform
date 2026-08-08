# ==========================================
# Multi-Stage Dockerfile for Spring Boot Backend
# CDAC Project Deployment Standard
# ==========================================

# STAGE 1: Build Phase using Maven and OpenJDK 21
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml to cache dependency downloads
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Copy source code and build executable JAR (skipping unit tests for fast build)
COPY src ./src
RUN mvn package -DskipTests

# STAGE 2: Runtime Phase using lightweight JRE 21
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy compiled JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose application port
EXPOSE 8080

# Run Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
