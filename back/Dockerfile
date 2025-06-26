# 1단계: 빌드
FROM gradle:jdk21-alpine AS builder
WORKDIR /app
COPY . .
RUN gradle build -x test

# 2단계: 실행
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8891
ENTRYPOINT ["java", "-jar", "app.jar"] 