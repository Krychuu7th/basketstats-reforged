FROM openjdk:17
VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} basketstats.jar
ENTRYPOINT ["java","-jar","/basketstats.jar"]