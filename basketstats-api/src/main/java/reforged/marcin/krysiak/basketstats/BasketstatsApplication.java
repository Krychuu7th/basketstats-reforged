package reforged.marcin.krysiak.basketstats;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class BasketstatsApplication {

    public static void main(String[] args) {
        SpringApplication.run(BasketstatsApplication.class, args);
    }
}
