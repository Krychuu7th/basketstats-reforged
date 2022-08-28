package pwsz.marcin.krysiak.basketstats.exceptions;

public class MatchNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {
        return "Nie znaleziono meczu!";
    }
}
