package reforged.marcin.krysiak.basketstats.providers;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reforged.marcin.krysiak.basketstats.utils.UserInfo;

import java.util.LinkedHashMap;

@Component
public class UserProvider {
    private final static String AUTHORIZATION_HEADER = "Authorization";
    @Autowired
    HttpServletRequest httpServletRequest;
    @Autowired
    UserInfo userInfo;

    public String getUsername() {
        final String authorizationHeader = getAuthorizationHeader();
        return authorizationHeader != null ? this.userInfo.getUsernameValue(authorizationHeader) : null;
    }

    public LinkedHashMap<String, String> getUserInfoMap() {
        final String authorizationHeader = getAuthorizationHeader();
        return authorizationHeader != null ? this.userInfo.getUserInfoMap(authorizationHeader) : null;
    }

    private String getAuthorizationHeader() {
        final var authorizationHeader = this.httpServletRequest.getHeader(AUTHORIZATION_HEADER);
        if (Strings.isEmpty(authorizationHeader)) {
            return null;
        }
        return authorizationHeader;
    }
}
