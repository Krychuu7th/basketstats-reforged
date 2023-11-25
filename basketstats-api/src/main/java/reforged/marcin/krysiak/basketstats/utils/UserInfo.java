package reforged.marcin.krysiak.basketstats.utils;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import reforged.marcin.krysiak.basketstats.constants.CacheKeys;

import java.util.LinkedHashMap;

@Component
public class UserInfo {
    private final static String AUTHORIZATION_HEADER = "Authorization";

    @Cacheable(CacheKeys.USER_NAME)
    public String getUsernameValue(String authorizationHeader) {
        return this.getUserInfoMap(authorizationHeader).get("nickname");
    }

    @Cacheable(CacheKeys.USER_EMAIL)
    public String getEmailValue(String authorizationHeader) {
        return this.getUserInfoMap(authorizationHeader).get("email");
    }

    @Cacheable(CacheKeys.USER_INFO_MAP)
    public LinkedHashMap<String, String> getUserInfoMap(String authorizationHeader) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set(AUTHORIZATION_HEADER, authorizationHeader);
        HttpEntity<Object> httpEntity = new HttpEntity<>(null, headers);
        final var response = restTemplate.exchange("https://basketstats.eu.auth0.com/userinfo", HttpMethod.GET, httpEntity, LinkedHashMap.class);

        return response.getBody();
    }
}
