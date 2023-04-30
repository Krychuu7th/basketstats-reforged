package reforged.marcin.krysiak.basketstats.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class ScheduleConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(ScheduleConfiguration.class);

//    @Transactional
//    @Scheduled(cron = "0 13 * * 1 ?") // every monday at 1:00
//    public void scheduleTaskForDeletingExpiredTokensFromBlacklist() {
//        long now = (new Date().getTime()) / 1000;
//        logger.info("Triggering scheduled task for deleting expired tokens from blacklist ");
//        this.jwtBlacklistService.deleteAllExpiredBlacklistedTokens();
//    }
}
