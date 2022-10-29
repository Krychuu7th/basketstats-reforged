package reforged.marcin.krysiak.basketstats.service;

import reforged.marcin.krysiak.basketstats.models.Token;

public interface AuthService {
    Token refreshToken(String jwt);
}
