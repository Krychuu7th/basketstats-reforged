package pwsz.marcin.krysiak.basketstats.security;

import com.google.gson.Gson;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.val;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pwsz.marcin.krysiak.basketstats.constants.SecurityConstants;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final Gson gson = new Gson();

    private LoginData loginData;

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private static class JSONToken {
        private String token;

        public JSONToken(String token) {
            this.token = token;
        }
    }

    private static class LoginData {
        private String username;
        private String password;
        private boolean rememberMe;

        public LoginData(String username, String password, boolean rememberMe) {
            this.username = username;
            this.password = password;
            this.rememberMe = rememberMe;
        }

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }

        public boolean isRememberMe() {
            return rememberMe;
        }

        @Override
        public String toString() {
            return "LoginData{" +
                    "username='" + username + '\'' +
                    ", password='" + password + '\'' +
                    ", rememberMe=" + rememberMe +
                    '}';
        }
    }

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;

        setFilterProcessesUrl(SecurityConstants.AUTH_LOGIN_URL);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String requestData;
        try {
            requestData = request.getReader().lines().collect(Collectors.joining()); //convert JSON from request to string
        } catch (IOException e) {
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("", ""));
        }

        this.loginData = gson.fromJson(requestData, LoginData.class); // creating class LoginData converting from JSON

        String username = this.loginData.getUsername();
        String password = this.loginData.getPassword();
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                                      FilterChain filterChain, Authentication authentication) {

        UserDetails user = ((UserDetails) authentication.getPrincipal());

        List<String> roles = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        var signingKey = SecurityConstants.JWT_SECRET.getBytes();
        long expirationTimeOfToken;
        if(this.loginData.isRememberMe()) {
            expirationTimeOfToken = 604800000;
        } else {
            expirationTimeOfToken = 36000000;
        }

        String token = Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, Keys.hmacShaKeyFor(signingKey))
                .setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)
                .setIssuer(SecurityConstants.TOKEN_ISSUER)
                .setAudience(SecurityConstants.TOKEN_AUDIENCE)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTimeOfToken)) // 10 hours of expiration time or 7 days if rememberMe = true
                .claim("role", roles)
                .compact();

        JSONToken jsonToken = new JSONToken(token);

        String tokenJsonString = gson.toJson(jsonToken);
        try {
            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(tokenJsonString);
            out.flush();
        }catch (IOException e) {
            System.out.println(e);
        }
    }
}
