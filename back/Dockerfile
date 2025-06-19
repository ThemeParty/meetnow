# Build stage
FROM gradle:8.7-jdk21 AS build

# Set working directory
WORKDIR /app

# Copy gradle files first for better caching
COPY gradle/ gradle/
COPY gradlew gradlew.bat build.gradle.kts settings.gradle.kts gradle.properties ./

# Download dependencies
RUN gradle dependencies --no-daemon

# Copy source code
COPY src/ src/

# Build the application
RUN gradle build --no-daemon -x test -x ktlintCheck -x ktlintFormat -x runKtlintCheckOverMainSourceSet -x runKtlintCheckOverKotlinScripts

# Runtime stage
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy the built jar from build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Change ownership to non-root user
RUN chown appuser:appuser app.jar

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8891

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8891/actuator/health || exit 1

# Run the application with default profile
ENTRYPOINT ["java", "-Dspring.profiles.active=local", "-jar", "app.jar"]
