package reforged.marcin.krysiak.basketstats.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reforged.marcin.krysiak.basketstats.exceptions.PlayerNotFoundException;
import reforged.marcin.krysiak.basketstats.models.Player;
import reforged.marcin.krysiak.basketstats.repositories.PlayerRepository;
import reforged.marcin.krysiak.basketstats.service.PlayerService;

import java.util.List;

@Service
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @Override
    public List<Player> getAllPlayersByTeamId(Long teamId) {
        return playerRepository.getAllByTeamId(teamId);
    }

    @Override
    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public void updatePlayer(Player player, Long id) {
        Player newPlayer = playerRepository.findById(id)
                .orElseThrow(PlayerNotFoundException::new);
        newPlayer.setFirstName(player.getFirstName());
        newPlayer.setLastName(player.getLastName());
        newPlayer.setNumber(player.getNumber());
        newPlayer.setPosition(player.getPosition());

        playerRepository.save(newPlayer);
    }

    @Override
    public void deletePlayerById(Long id) {
        playerRepository.deleteById(id);
    }


}
