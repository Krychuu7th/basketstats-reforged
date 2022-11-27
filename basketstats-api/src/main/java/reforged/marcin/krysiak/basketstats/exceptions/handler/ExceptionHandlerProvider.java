package reforged.marcin.krysiak.basketstats.exceptions.handler;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import reforged.marcin.krysiak.basketstats.exceptions.ApiError;
import reforged.marcin.krysiak.basketstats.exceptions.MatchIsFinishedException;
import reforged.marcin.krysiak.basketstats.exceptions.MatchNotFoundException;
import reforged.marcin.krysiak.basketstats.exceptions.TeamNotFoundException;

public class ExceptionHandlerProvider {
    @ExceptionHandler(MatchIsFinishedException.class)
    public ResponseEntity<Object> handleUpdateException(MatchIsFinishedException ex) {
        ApiError apiError =
                new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), ex.getMessage());
        return new ResponseEntity<>(
                apiError, new HttpHeaders(), apiError.getStatus());
    }

    @ExceptionHandler(MatchNotFoundException.class)
    public ResponseEntity<Object> handleUpdateException(MatchNotFoundException ex) {
        ApiError apiError =
                new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), ex.getMessage());
        return new ResponseEntity<>(
                apiError, new HttpHeaders(), apiError.getStatus());
    }

    @ExceptionHandler(TeamNotFoundException.class)
    public ResponseEntity<Object> handleUpdateException(TeamNotFoundException ex) {
        ApiError apiError =
                new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), ex.getMessage());
        return new ResponseEntity<>(
                apiError, new HttpHeaders(), apiError.getStatus());
    }
}
