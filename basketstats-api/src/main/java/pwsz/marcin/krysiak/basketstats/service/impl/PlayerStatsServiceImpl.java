package pwsz.marcin.krysiak.basketstats.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pwsz.marcin.krysiak.basketstats.dto.PlayerStatsAvgForTeamDTO;
import pwsz.marcin.krysiak.basketstats.dto.PlayersSummaryStatsOfMatchDTO;
import pwsz.marcin.krysiak.basketstats.repositories.custom.PlayerStatsRepositoryCustom;
import pwsz.marcin.krysiak.basketstats.service.PlayerStatsService;

import java.util.List;

@Service
@Transactional
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
