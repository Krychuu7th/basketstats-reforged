call .\mvnw install
call docker build --build-arg JAR_FILE=target/*.jar -t basketstats/basketstats-api .