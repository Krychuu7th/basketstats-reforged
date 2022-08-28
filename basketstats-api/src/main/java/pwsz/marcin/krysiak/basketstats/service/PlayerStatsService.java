package pwsz.marcin.krysiak.basketstats.service;

import pwsz.marcin.krysiak.basketstats.dto.PlayerStatsAvgForTeamDTO;
import pwsz.marcin.krysiak.basketstats.dto.PlayersSummaryStatsOfMatchDTO;

import java.util.List;

public interface PlayerStatsService {
    List<PlayerStatsAvgForTeamDTO> getAllAvgPlayerStatsForTeam(Long teamId) throws Exception;

    List<PlayersSummaryStatsOfMatchDTO> getSummaryStatsOfMatchForAllPlayers(Long teamId) throws Exception;
}
