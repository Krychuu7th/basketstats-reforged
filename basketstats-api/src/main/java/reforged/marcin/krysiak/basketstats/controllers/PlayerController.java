package reforged.marcin.krysiak.basketstats.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reforged.marcin.krysiak.basketstats.models.Player;
import reforged.marcin.krysiak.basketstats.service.PlayerService;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/player")
@RestController
@CrossOrigin
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @GetMapping("/teamPlayers/{id}")
    public ResponseEntity<List<Player>> getAllTeams(@PathVariable Long id) {

        return ResponseEntity.ok().body(playerService.getAllPlayersByTeamId(id));
    }

    @PostMapping("/create")
    public Object createPlayer(@Valid @RequestBody Player player) {
        playerService.createPlayer(player);
        return true;
    }

    @PutMapping("/update/{id}")
    public Object updatePlayer(@Valid @RequestBody Player player, @PathVariable Long id) {

        playerService.updatePlayer(player, id);
        return true;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePlayerById(@PathVariable Long id) {

        try {
            playerService.deletePlayerById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
