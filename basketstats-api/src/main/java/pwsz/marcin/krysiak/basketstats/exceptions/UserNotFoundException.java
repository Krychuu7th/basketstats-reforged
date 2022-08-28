package pwsz.marcin.krysiak.basketstats.exceptions;

public class UserNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {
        return "Nie znaleziono użytkownika!";
    }
}
