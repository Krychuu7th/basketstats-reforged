package reforged.marcin.krysiak.basketstats.exceptions;

public class MatchIsFinishedException extends RuntimeException {
    @Override
    public String getMessage() {
        return "Nie można edytować zakończonego meczu!";
    }
}
