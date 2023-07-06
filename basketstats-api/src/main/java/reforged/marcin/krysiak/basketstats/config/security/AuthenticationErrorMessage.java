package reforged.marcin.krysiak.basketstats.config.security;

public record AuthenticationErrorMessage(String message) {

    public static AuthenticationErrorMessage from(final String message) {
        return new AuthenticationErrorMessage(message);
    }
}
