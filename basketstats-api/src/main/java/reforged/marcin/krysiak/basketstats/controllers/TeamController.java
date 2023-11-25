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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reforged.marcin.krysiak.basketstats.dto.PlayerStatsAvgForTeamDTO;
import reforged.marcin.krysiak.basketstats.dto.TeamDto;
import reforged.marcin.krysiak.basketstats.dto.TeamFormDTO;
import reforged.marcin.krysiak.basketstats.exceptions.TeamNotFoundException;
import reforged.marcin.krysiak.basketstats.models.Team;
import reforged.marcin.krysiak.basketstats.service.PlayerStatsService;
import reforged.marcin.krysiak.basketstats.service.TeamService;
import reforged.marcin.krysiak.basketstats.service.ftp.FtpService;

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

    @Autowired
    FtpService ftpService;

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
    public ResponseEntity<TeamDto> create(@ModelAttribute("team") TeamFormDTO team) {
        return ResponseEntity.ok(teamService.create(team));
    }

    @GetMapping("/isTeamWithNameExisting/{name}")
    public boolean isUserWithEmailExisting(@PathVariable String name) throws TeamNotFoundException {
        return Objects.nonNull(teamService.getByName(name));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamDto> update(@ModelAttribute("team") TeamFormDTO team, @PathVariable Long id) {

        return ResponseEntity.ok(teamService.update(id, team));
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
