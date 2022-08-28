package pwsz.marcin.krysiak.basketstats.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pwsz.marcin.krysiak.basketstats.exceptions.LeagueNotFoundException;
import pwsz.marcin.krysiak.basketstats.exceptions.UserNotFoundException;
import pwsz.marcin.krysiak.basketstats.models.League;
import pwsz.marcin.krysiak.basketstats.models.User;
import pwsz.marcin.krysiak.basketstats.service.LeagueService;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/league")
@RestController
@CrossOrigin
public class LeagueController {

    @Autowired
    LeagueService leagueService;

    @GetMapping("/list")
    public ResponseEntity<List<League>> getAllLeagues() {

        return ResponseEntity.ok().body(leagueService.getAllLeagues());
    }

    @GetMapping("/isLeagueWithNameExisting/{name}")
    public boolean isUserWithUsernameExisting(@PathVariable String name) throws LeagueNotFoundException {
        try {
            League league = leagueService.getLeagueByNane(name)
                    .orElseThrow(LeagueNotFoundException::new);
        } catch (LeagueNotFoundException e) {
            return false;
        }
        return true;
    }

    @PostMapping("/create")
    public ResponseEntity<League> createLeague(@Valid @RequestBody League league) {
        return ResponseEntity.ok().body(leagueService.createLeague(league));
    }

    @PutMapping("/update/{id}")
    public Object updateUser(@Valid @RequestBody League league, @PathVariable Long id) {

        leagueService.updateLeague(id, league);
        return true;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {

        try {
            leagueService.deleteLeague(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
