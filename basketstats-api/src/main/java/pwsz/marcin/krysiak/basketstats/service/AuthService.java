package pwsz.marcin.krysiak.basketstats.service;

import pwsz.marcin.krysiak.basketstats.models.Token;

public interface AuthService {
    Token refreshToken(String jwt);
}
