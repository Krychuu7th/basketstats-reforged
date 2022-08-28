package pwsz.marcin.krysiak.basketstats.controllers;

import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pwsz.marcin.krysiak.basketstats.dto.PlayerStatsAvgForTeamDTO;
import pwsz.marcin.krysiak.basketstats.dto.TeamWithLogoDTO;
import pwsz.marcin.krysiak.basketstats.exceptions.ApiError;
import pwsz.marcin.krysiak.basketstats.exceptions.MatchNotFoundException;
import pwsz.marcin.krysiak.basketstats.exceptions.TeamNotFoundException;
import pwsz.marcin.krysiak.basketstats.exceptions.UserNotFoundException;
import pwsz.marcin.krysiak.basketstats.messages.ResponseFile;
import pwsz.marcin.krysiak.basketstats.messages.ResponseMessage;
import pwsz.marcin.krysiak.basketstats.models.Team;
import pwsz.marcin.krysiak.basketstats.models.User;
import pwsz.marcin.krysiak.basketstats.service.PlayerStatsService;
import pwsz.marcin.krysiak.basketstats.service.TeamService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.midi.SysexMessage;
import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
