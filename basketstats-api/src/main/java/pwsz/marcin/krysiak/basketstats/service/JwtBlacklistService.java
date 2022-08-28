package pwsz.marcin.krysiak.basketstats.service;

import pwsz.marcin.krysiak.basketstats.models.JwtBlacklist;

public interface JwtBlacklistService {
    boolean isBlacklisted(String token); //checks if token exists in jwt blacklist in database
    JwtBlacklist addToBlacklist(String token);
    void deleteAllExpiredBlacklistedTokens(); //remove all tokens from blacklist if their date expired
}
