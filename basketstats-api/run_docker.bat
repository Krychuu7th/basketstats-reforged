call docker stop basketstats-postgres
call docker rm basketstats-postgres
call docker stop basketstats-api
call docker rm basketstats-api
call docker run --name basketstats-postgres -d -p 5433:5432 -e POSTGRES_PASSWORD=postgres postgres
call docker run --name basketstats-api -p 8080:8080 ^
-e DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver ^
-e DATASOURCE_PASSWORD=postgres ^
-e DATASOURCE_USERNAME=postgres ^
-e DATASOURCE_URL=jdbc:postgresql://172.17.0.1:5433/postgres basketstats/basketstats-api
