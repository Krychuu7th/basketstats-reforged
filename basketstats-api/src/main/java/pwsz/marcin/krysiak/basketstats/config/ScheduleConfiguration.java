package pwsz.marcin.krysiak.basketstats.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;
import pwsz.marcin.krysiak.basketstats.service.JwtBlacklistService;

import java.util.Date;

@Configuration
@EnableScheduling
public class ScheduleConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(ScheduleConfiguration.class);
    private final JwtBlacklistService jwtBlacklistService;

    @Autowired
    public ScheduleConfiguration(JwtBlacklistService jwtBlacklistService) {
        this.jwtBlacklistService = jwtBlacklistService;
    }

    @Transactional
    @Scheduled(cron = "0 13 * * 1 ?") // every monday at 1:00
    public void scheduleTaskForDeletingExpiredTokensFromBlacklist() {
        long now = (new Date().getTime()) / 1000;
        logger.info("Triggering scheduled task for deleting expired tokens from blacklist ");
        this.jwtBlacklistService.deleteAllExpiredBlacklistedTokens();
    }
}
