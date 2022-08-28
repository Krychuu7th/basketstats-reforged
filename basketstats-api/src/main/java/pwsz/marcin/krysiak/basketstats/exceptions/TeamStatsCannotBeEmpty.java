package pwsz.marcin.krysiak.basketstats.exceptions;

public class TeamStatsCannotBeEmpty extends RuntimeException {
    @Override
    public String getMessage() {
        return "Tablica ze statystykami nie może być pusta!";
    }
}
