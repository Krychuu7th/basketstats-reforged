package reforged.marcin.krysiak.basketstats.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reforged.marcin.krysiak.basketstats.dto.PlayerStatsAvgForTeamDTO;
import reforged.marcin.krysiak.basketstats.dto.TeamWithLogoDTO;
import reforged.marcin.krysiak.basketstats.exceptions.ApiError;
import reforged.marcin.krysiak.basketstats.exceptions.TeamNotFoundException;
import reforged.marcin.krysiak.basketstats.messages.ResponseMessage;
import reforged.marcin.krysiak.basketstats.models.Team;
import reforged.marcin.krysiak.basketstats.service.PlayerStatsService;
import reforged.marcin.krysiak.basketstats.service.TeamService;

import java.util.List;

@RequestMapping("/api/team")
@RestController
@CrossOrigin
public class TeamController {

    @Autowired
    TeamService teamService;

    @Autowired
    PlayerStatsService playerStatsService;


    @GetMapping("/list")
    public ResponseEntity<List<Team>> getAllTeams() {

        return ResponseEntity.ok().body(teamService.getAllTeams());
    }

    @GetMapping("/leagueList/{id}")
    public ResponseEntity<List<Team>> getAllTeamsByLeague(@PathVariable Long id) {

        return ResponseEntity.ok().body(teamService.getAllTeamsByLeague(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id) throws Exception {
        Team team = teamService.getTeamById(id)
                .orElseThrow(TeamNotFoundException::new);

        return ResponseEntity.ok().body(team);
    }

    @GetMapping("/playersAvgStats/{id}")
    public ResponseEntity<List<PlayerStatsAvgForTeamDTO>> getAllAvgPlayerStatsForTeam(@PathVariable Long id) throws Exception {

        return ResponseEntity.ok().body(playerStatsService.getAllAvgPlayerStatsForTeam(id));
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseMessage> createTeam(@ModelAttribute("team") TeamWithLogoDTO team) {

        String message = "";
        try {
            teamService.createTeam(team);

            message = "Drużyna została dodana pomyślnie wraz z obrazem: " + team.getLogoFile().getName();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Drużyna nie została zaktualizowana, problem z obrazem: " + team.getLogoFile().getName() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @GetMapping("/logo/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        Team team = teamService.getTeamById(id)
                .orElseGet(Team::new);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + team.getLogo() + "\"")
                .body(team.getData());
    }

    @GetMapping("/isTeamWithNameExisting/{name}")
    public boolean isUserWithEmailExisting(@PathVariable String name) throws TeamNotFoundException {
        try {
            Team team = teamService.getTeamByName(name);
            if(team == null) {
                throw new TeamNotFoundException();
            }
        } catch (TeamNotFoundException e) {
            return false;
        }
        return true;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseMessage> updateUser(@ModelAttribute("team") TeamWithLogoDTO team, @PathVariable Long id) {

        String message = "";
        try {
            teamService.updateTeam(id, team);

            message = "Drużyna została zaktualizowana pomyślnie wraz z obrazem: " + team.getLogoFile().getName();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Drużyna nie została zaktualizowana, problem z obrazem: " + team.getLogoFile().getName() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {

        try {
            teamService.deleteTeam(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @ExceptionHandler(TeamNotFoundException.class)
    public ResponseEntity<Object> handleUpdateException(TeamNotFoundException ex) {
        ApiError apiError =
                new ApiError(HttpStatus.NOT_ACCEPTABLE, ex.getLocalizedMessage(), ex.getMessage());
        return new ResponseEntity<>(
                apiError, new HttpHeaders(), apiError.getStatus());
    }
}
