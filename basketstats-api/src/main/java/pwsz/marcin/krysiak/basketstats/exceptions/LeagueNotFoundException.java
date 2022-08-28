package pwsz.marcin.krysiak.basketstats.exceptions;

public class LeagueNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {
        return "Nie znaleziono ligi!";
    }
}
