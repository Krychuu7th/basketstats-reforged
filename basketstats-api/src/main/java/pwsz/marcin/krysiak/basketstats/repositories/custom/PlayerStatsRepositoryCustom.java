package pwsz.marcin.krysiak.basketstats.repositories.custom;

import pwsz.marcin.krysiak.basketstats.dto.PlayerStatsAvgForTeamDTO;
import pwsz.marcin.krysiak.basketstats.dto.PlayersSummaryStatsOfMatchDTO;
import pwsz.marcin.krysiak.basketstats.models.PlayerStats;

import java.util.List;

public interface PlayerStatsRepositoryCustom {
    List<PlayerStatsAvgForTeamDTO> getAllAvgStatsOfTeamPlayers(Long teamId) throws Exception;

    List<PlayersSummaryStatsOfMatchDTO> getSummaryStatsOfMatchForAllPlayers(Long matchId) throws Exception;
}
