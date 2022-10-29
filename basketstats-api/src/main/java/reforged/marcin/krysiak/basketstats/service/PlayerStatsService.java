package reforged.marcin.krysiak.basketstats.service;

import reforged.marcin.krysiak.basketstats.dto.PlayerStatsAvgForTeamDTO;
import reforged.marcin.krysiak.basketstats.dto.PlayersSummaryStatsOfMatchDTO;

import java.util.List;

public interface PlayerStatsService {
    List<PlayerStatsAvgForTeamDTO> getAllAvgPlayerStatsForTeam(Long teamId) throws Exception;

    List<PlayersSummaryStatsOfMatchDTO> getSummaryStatsOfMatchForAllPlayers(Long teamId) throws Exception;
}
