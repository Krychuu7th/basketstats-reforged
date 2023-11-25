package reforged.marcin.krysiak.basketstats.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import reforged.marcin.krysiak.basketstats.providers.UserProvider;
import reforged.marcin.krysiak.basketstats.service.audit.AuditorAwareImpl;

@Configuration
@EnableTransactionManagement
@EnableJpaAuditing
public class PersistanceConfig {

    @Autowired
    UserProvider userProvider;

    @Bean
    AuditorAware<String> auditorProvider() {
        return new AuditorAwareImpl(this.userProvider);
    }
}
