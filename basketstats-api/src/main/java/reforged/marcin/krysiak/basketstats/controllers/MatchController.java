package reforged.marcin.krysiak.basketstats.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reforged.marcin.krysiak.basketstats.dto.MatchQuarterStatsSaveRequestDTO;
import reforged.marcin.krysiak.basketstats.dto.MatchStatsDTO;
import reforged.marcin.krysiak.basketstats.dto.MatchWithScoreDTO;
import reforged.marcin.krysiak.basketstats.dto.PlayersSummaryStatsOfMatchDTO;
import reforged.marcin.krysiak.basketstats.exceptions.ApiError;
import reforged.marcin.krysiak.basketstats.exceptions.MatchIsFinishedException;
import reforged.marcin.krysiak.basketstats.exceptions.MatchNotFoundException;
import reforged.marcin.krysiak.basketstats.exceptions.TeamNotFoundException;
import reforged.marcin.krysiak.basketstats.models.Match;
import reforged.marcin.krysiak.basketstats.models.MatchQuarter;
import reforged.marcin.krysiak.basketstats.service.MatchQuarterService;
import reforged.marcin.krysiak.basketstats.service.MatchService;
import reforged.marcin.krysiak.basketstats.service.PlayerStatsService;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/match")
@RestController
@CrossOrigin
public class MatchController {

    @Autowired
    MatchService matchService;

    @Autowired
    MatchQuarterService matchQuarterService;

    @Autowired
    PlayerStatsService playerStatsService;

    @GetMapping("/list")
    public ResponseEntity<List<MatchWithScoreDTO>> getAllMatches() {
        return ResponseEntity.ok().body(matchService.getAllMatches());
    }

    @GetMapping("/team/{id}")
    public ResponseEntity<List<MatchWithScoreDTO>> getAllMatchesByTeamId(@PathVariable Long id) {
        return ResponseEntity.ok().body(matchService.getAllMatchesByTeamId(id));
    }

    @GetMapping("/league/{id}")
    public ResponseEntity<List<MatchWithScoreDTO>> getAllMatchesByleagueId(@PathVariable Long id) {
        return ResponseEntity.ok().body(matchService.getAllMatchesByLeagueId(id));
    }

    @GetMapping("/userMatches/{id}/{userId}")
    public ResponseEntity<List<MatchWithScoreDTO>> getAllMatchesByleagueId(@PathVariable Long id, @PathVariable Long userId) {
        return ResponseEntity.ok().body(matchService.getAllMatchesByLeagueIdAndUserId(id, userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchWithScoreDTO> getMatchById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok().body(matchService.getMatchWithScoreById(id));
    }

    @GetMapping("/stats/{id}")
    public ResponseEntity<List<MatchQuarter>> getAllMatchStats(@PathVariable Long id) throws Exception {
        Match match = matchService.getMatchById(id)
                .orElseThrow(TeamNotFoundException::new);
        return ResponseEntity.ok().body(matchQuarterService.getAllByMatch(match));
    }

    @GetMapping("/summary/{id}")
    public ResponseEntity<List<MatchStatsDTO>> getAllSummaryStatsForTeam(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok().body(matchService.getMatchStats(id));
    }

    @GetMapping("/playersSummary/{id}")
    public ResponseEntity<List<PlayersSummaryStatsOfMatchDTO>> getAllPlayersSummaryStatsOfMatch(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok().body(playerStatsService.getSummaryStatsOfMatchForAllPlayers(id));
    }

    @PostMapping("/create")
    public Object createUser(@Valid @RequestBody Match match) {
        matchService.createMatch(match);
        return true;
    }

    @PutMapping("/update/{id}")
    public Object updateUser(@Valid @RequestBody Match match, @PathVariable Long id) throws MatchIsFinishedException {
        matchService.updateMatch(id, match);
        return true;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMatchById(@PathVariable Long id) {

        try {
            matchService.deleteMatch(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getMatchQuartersCount/{id}")
    public int getMatchQuartersCount(@PathVariable Long id) throws Exception {
        Match match = matchService.getMatchById(id)
                .orElseThrow(MatchNotFoundException::new);
        return matchQuarterService.getAllByMatch(match).size();
    }

    @PostMapping("/saveMatchQuarterStats")
    public Object saveMatchQuarterStats(@Valid @RequestBody MatchQuarterStatsSaveRequestDTO request) {
        matchQuarterService.saveMatchQuarterStats(request);
        return true;
    }

    @ExceptionHandler(MatchIsFinishedException.class)
    public ResponseEntity<Object> handleUpdateException(MatchIsFinishedException ex) {
        ApiError apiError =
                new ApiError(HttpStatus.NOT_ACCEPTABLE, ex.getLocalizedMessage(), ex.getMessage());
        return new ResponseEntity<>(
                apiError, new HttpHeaders(), apiError.getStatus());
    }

    @ExceptionHandler(MatchNotFoundException.class)
    public ResponseEntity<Object> handleUpdateException(MatchNotFoundException ex) {
        ApiError apiError =
                new ApiError(HttpStatus.NOT_ACCEPTABLE, ex.getLocalizedMessage(), ex.getMessage());
        return new ResponseEntity<>(
                apiError, new HttpHeaders(), apiError.getStatus());
    }

}
