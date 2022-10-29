package reforged.marcin.krysiak.basketstats.repositories.custom;

import reforged.marcin.krysiak.basketstats.dto.PlayerStatsAvgForTeamDTO;
import reforged.marcin.krysiak.basketstats.dto.PlayersSummaryStatsOfMatchDTO;

import java.util.List;

public interface PlayerStatsRepositoryCustom {
    List<PlayerStatsAvgForTeamDTO> getAllAvgStatsOfTeamPlayers(Long teamId) throws Exception;

    List<PlayersSummaryStatsOfMatchDTO> getSummaryStatsOfMatchForAllPlayers(Long matchId) throws Exception;
}
