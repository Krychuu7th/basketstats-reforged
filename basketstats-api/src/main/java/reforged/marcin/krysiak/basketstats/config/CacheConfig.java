package reforged.marcin.krysiak.basketstats.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reforged.marcin.krysiak.basketstats.constants.CacheKeys;
import reforged.marcin.krysiak.basketstats.utils.ReflectionUtils;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        String[] keys = ReflectionUtils.getAllFieldValues(CacheKeys.class).stream().map(key -> (String) key).toArray(String[]::new);
        return new ConcurrentMapCacheManager(keys);
    }
}
