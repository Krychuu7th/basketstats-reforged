package pwsz.marcin.krysiak.basketstats.service;

import pwsz.marcin.krysiak.basketstats.models.Player;
import pwsz.marcin.krysiak.basketstats.models.User;

import java.util.List;

public interface PlayerService {
    List<Player> getAllPlayers();

    List<Player> getAllPlayersByTeamId(Long teamId);

    Player createPlayer(Player player);
    void updatePlayer(Player player, Long id);
    void deletePlayerById(Long id);
}
