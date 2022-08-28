package pwsz.marcin.krysiak.basketstats.exceptions;

public class PlayerNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {
        return "Nie znaleziono zawodnika!";
    }
}
