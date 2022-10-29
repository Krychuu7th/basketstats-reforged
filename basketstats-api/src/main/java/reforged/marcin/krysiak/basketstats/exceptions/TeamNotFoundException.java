package reforged.marcin.krysiak.basketstats.exceptions;

public class TeamNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {
        return "Nie znaleziono drużyny!";
    }
}
