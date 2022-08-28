package pwsz.marcin.krysiak.basketstats.service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pwsz.marcin.krysiak.basketstats.constants.SecurityConstants;
import pwsz.marcin.krysiak.basketstats.models.JwtBlacklist;
import pwsz.marcin.krysiak.basketstats.repositories.JwtBlacklistRepository;
import pwsz.marcin.krysiak.basketstats.service.JwtBlacklistService;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class JwtBlacklistServiceImpl implements JwtBlacklistService {

    private static Logger logger = LoggerFactory.getLogger(JwtBlacklistService.class);

    @Autowired
    JwtBlacklistRepository jwtBlacklistRepository;

    @Override
    public boolean isBlacklisted(String token) {
        return jwtBlacklistRepository.existsByToken(token);
    }

    @Override
    public JwtBlacklist addToBlacklist(String token) {
        String tokenWithoutPrefix = token.replace("Bearer ", "");
        logger.info("JWT is about to be blacklisted: " +tokenWithoutPrefix);
        long now = (new Date().getTime()) / 1000;
        return this.jwtBlacklistRepository.save(new JwtBlacklist(tokenWithoutPrefix, now + 604800)); // 7 days of expiration time (in seconds)
    }

    @Override
    public void deleteAllExpiredBlacklistedTokens() {
        List<JwtBlacklist> jwtBlacklist = this.jwtBlacklistRepository.findAll();
        for (JwtBlacklist token: jwtBlacklist) {
            System.out.println(token.getExpirationDate());
        }
        long now = (new Date().getTime()) / 1000;
        System.out.println("NOW: "+ now);
        this.jwtBlacklistRepository.deleteAllByExpirationDateLessThan(now);
    }
}
