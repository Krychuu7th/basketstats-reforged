package reforged.marcin.krysiak.basketstats.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reforged.marcin.krysiak.basketstats.dto.PlayerStatsAvgForTeamDTO;
import reforged.marcin.krysiak.basketstats.dto.PlayersSummaryStatsOfMatchDTO;
import reforged.marcin.krysiak.basketstats.repositories.custom.PlayerStatsRepositoryCustom;
import reforged.marcin.krysiak.basketstats.service.PlayerStatsService;

import java.util.List;

@Service
public class PlayerStatsServiceImpl implements PlayerStatsService {

    @Autowired
    private PlayerStatsRepositoryCustom playerStatsRepositoryCustom;

    @Override
    public List<PlayerStatsAvgForTeamDTO> getAllAvgPlayerStatsForTeam(Long teamId) throws Exception {
        return playerStatsRepositoryCustom.getAllAvgStatsOfTeamPlayers(teamId);
    }

    @Override
    public List<PlayersSummaryStatsOfMatchDTO> getSummaryStatsOfMatchForAllPlayers(Long teamId) throws Exception {
        return playerStatsRepositoryCustom.getSummaryStatsOfMatchForAllPlayers(teamId);
    }
}
