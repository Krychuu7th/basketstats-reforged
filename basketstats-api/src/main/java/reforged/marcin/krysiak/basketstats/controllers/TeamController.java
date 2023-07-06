package reforged.marcin.krysiak.basketstats.controllers;

import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reforged.marcin.krysiak.basketstats.dto.PlayerStatsAvgForTeamDTO;
import reforged.marcin.krysiak.basketstats.dto.TeamDto;
import reforged.marcin.krysiak.basketstats.dto.TeamWithImageDTO;
import reforged.marcin.krysiak.basketstats.exceptions.TeamNotFoundException;
import reforged.marcin.krysiak.basketstats.models.Team;
import reforged.marcin.krysiak.basketstats.service.PlayerStatsService;
import reforged.marcin.krysiak.basketstats.service.TeamService;

import java.util.List;
import java.util.Objects;

@RequestMapping("/api/team")
@RestController
@CrossOrigin
public class TeamController {

    @Autowired
    TeamService teamService;

    @Autowired
    PlayerStatsService playerStatsService;

    @GetMapping
    public ResponseEntity<Page<TeamDto>> getTeamsBySpec(
            @And({
                    @Spec(path = "name", params = "searchLike", spec = LikeIgnoreCase.class),
                    @Spec(path = "league.id", params = "leagueIdEqual", spec = Equal.class)
            })
            Specification<Team> spec,
            Pageable pageable
    ) {
        return ResponseEntity.ok(teamService.getAllBySpec(spec, pageable));
    }

    @GetMapping("/league-id/{leagueId}")
    public ResponseEntity<Page<TeamDto>> getTeamsForLeagueBySpec(
            @PathVariable Long leagueId,
            @And({
                    @Spec(path = "name", params = "searchLike", spec = LikeIgnoreCase.class),
            })
            Specification<Team> spec,
            Pageable pageable
    ) {
        return ResponseEntity.ok(teamService.getAllForLeagueBySpec(leagueId, spec, pageable));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<TeamDto>> getAllTeams(
            @And({
                    @Spec(path = "name", params = "searchLike", spec = LikeIgnoreCase.class),
                    @Spec(path = "league.id", params = "leagueIdEqual", spec = Equal.class)
            })
            Specification<Team> spec
    ) {
        return ResponseEntity.ok(teamService.getAll(spec));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamDto> getTeamById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(teamService.getById(id));
    }

    @GetMapping("/playersAvgStats/{id}")
    public ResponseEntity<List<PlayerStatsAvgForTeamDTO>> getAllAvgPlayerStatsForTeam(@PathVariable Long id) throws Exception {

        return ResponseEntity.ok(playerStatsService.getAllAvgPlayerStatsForTeam(id));
    }

    @PostMapping
    public ResponseEntity<TeamDto> create(@ModelAttribute("team") TeamWithImageDTO team) {
        return ResponseEntity.ok(teamService.create(team));
    }

    @GetMapping("/logo/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        Team team = teamService.getEntityById(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + team.getImageName() + "\"")
                .body(team.getImageFile());
    }

    @GetMapping("/isTeamWithNameExisting/{name}")
    public boolean isUserWithEmailExisting(@PathVariable String name) throws TeamNotFoundException {
        return Objects.nonNull(teamService.getByName(name));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamDto> update(@ModelAttribute("team") TeamWithImageDTO team, @PathVariable Long id) {

        return ResponseEntity.ok(teamService.update(id, team));
//        String message = "";
//        try {
//            teamService.update(id, team);
//
//            message = "Drużyna została zaktualizowana pomyślnie wraz z obrazem: " + team.getImageFile().getName();
//            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
//        } catch (Exception e) {
//            message = "Drużyna nie została zaktualizowana, problem z obrazem: " + team.getImageFile().getName() + "!";
//            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
//        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {

        try {
            teamService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
