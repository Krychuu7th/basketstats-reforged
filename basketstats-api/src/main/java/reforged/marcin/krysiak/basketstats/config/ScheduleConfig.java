package reforged.marcin.krysiak.basketstats.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
@Slf4j
public class ScheduleConfig {

//    @Transactional
//    @Scheduled(cron = "0 13 * * 1 ?") // every monday at 1:00
//    public void scheduleTaskForDeletingExpiredTokensFromBlacklist() {
//        long now = (new Date().getTime()) / 1000;
//        logger.info("Triggering scheduled task for deleting expired tokens from blacklist ");
//        this.jwtBlacklistService.deleteAllExpiredBlacklistedTokens();
//    }
}
