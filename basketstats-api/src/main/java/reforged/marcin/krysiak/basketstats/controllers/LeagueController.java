package reforged.marcin.krysiak.basketstats.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reforged.marcin.krysiak.basketstats.dto.LeagueDto;
import reforged.marcin.krysiak.basketstats.exceptions.LeagueNotFoundException;
import reforged.marcin.krysiak.basketstats.models.League;
import reforged.marcin.krysiak.basketstats.service.LeagueService;

import java.util.List;

@RequestMapping("/api/league")
@RestController
@RequiredArgsConstructor
public class LeagueController {

    private final LeagueService leagueService;

    @GetMapping
    public ResponseEntity<Page<League>> getLeaguesBySpec(
            @Spec(path = "name", params = "searchLike", spec = LikeIgnoreCase.class)
            Specification<League> spec,
            Pageable pageable
    ) {
        return ResponseEntity.ok(leagueService.getAllBySpec(spec, pageable));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<League>> getAllLeagues(
            @Spec(path = "name", params = "searchLike", spec = LikeIgnoreCase.class)
            Specification<League> spec
    ) {
        return ResponseEntity.ok(leagueService.getAll(spec));
    }

    @GetMapping("/{id}")
    public ResponseEntity<League> getById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(leagueService.getById(id).orElse(null));
    }

    @GetMapping("/isLeagueWithNameExisting/{name}")
    public boolean isUserWithUsernameExisting(@PathVariable String name) throws LeagueNotFoundException {
        try {
            League league = leagueService.getByNane(name)
                    .orElseThrow(LeagueNotFoundException::new);
        } catch (LeagueNotFoundException e) {
            return false;
        }
        return true;
    }

    @PostMapping
    public ResponseEntity<LeagueDto> createLeague(@Valid @RequestBody LeagueDto league) {
        return ResponseEntity.ok(leagueService.create(league));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeagueDto> updateUser(@Valid @RequestBody LeagueDto league, @PathVariable Long id) {

        return ResponseEntity.ok(leagueService.update(id, league));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {

        try {
            leagueService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
