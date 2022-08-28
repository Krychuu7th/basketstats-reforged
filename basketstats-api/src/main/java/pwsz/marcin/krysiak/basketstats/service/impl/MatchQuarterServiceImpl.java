package pwsz.marcin.krysiak.basketstats.service.impl;

import net.bytebuddy.implementation.bytecode.Throw;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pwsz.marcin.krysiak.basketstats.dto.MatchQuarterStatsSaveRequestDTO;
import pwsz.marcin.krysiak.basketstats.exceptions.TeamStatsCannotBeEmpty;
import pwsz.marcin.krysiak.basketstats.models.Match;
import pwsz.marcin.krysiak.basketstats.models.MatchQuarter;
import pwsz.marcin.krysiak.basketstats.models.Player;
import pwsz.marcin.krysiak.basketstats.models.PlayerStats;
import pwsz.marcin.krysiak.basketstats.repositories.MatchQuarterRepository;
import pwsz.marcin.krysiak.basketstats.repositories.MatchRepository;
import pwsz.marcin.krysiak.basketstats.repositories.PlayerStatsRepository;
import pwsz.marcin.krysiak.basketstats.service.MatchQuarterService;
import pwsz.marcin.krysiak.basketstats.service.MatchService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MatchQuarterServiceImpl implements MatchQuarterService {

    @Autowired
    private MatchQuarterRepository matchQuarterRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerStatsRepository playerStatsRepository;

    @Override
    public List<MatchQuarter> getAllByMatch(Match match) {
        return matchQuarterRepository.findAllByMatchOrderByQuarterAsc(match);
    }

    @Override
    public MatchQuarter saveMatchQuarterStats(MatchQuarterStatsSaveRequestDTO request) {

        Match match = matchRepository.getOne(request.getMatchId());
        PlayerStats[] mergedTeamStats = ArrayUtils.addAll(request.getTeamAStats(), request.getTeamBStats());
        List<PlayerStats> matchStatsList = Arrays.asList(mergedTeamStats);
        if (matchStatsList.size() == 0) {
            throw new TeamStatsCannotBeEmpty();
        }
        return matchQuarterRepository.save(
                new MatchQuarter(match, request.getQuarter(), playerStatsRepository.saveAll(matchStatsList)));
    }
}
