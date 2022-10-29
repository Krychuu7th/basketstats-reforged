package reforged.marcin.krysiak.basketstats.service.impl;

import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reforged.marcin.krysiak.basketstats.dto.MatchQuarterStatsSaveRequestDTO;
import reforged.marcin.krysiak.basketstats.exceptions.TeamStatsCannotBeEmpty;
import reforged.marcin.krysiak.basketstats.models.Match;
import reforged.marcin.krysiak.basketstats.models.MatchQuarter;
import reforged.marcin.krysiak.basketstats.models.PlayerStats;
import reforged.marcin.krysiak.basketstats.repositories.MatchQuarterRepository;
import reforged.marcin.krysiak.basketstats.repositories.MatchRepository;
import reforged.marcin.krysiak.basketstats.repositories.PlayerStatsRepository;
import reforged.marcin.krysiak.basketstats.service.MatchQuarterService;

import java.util.Arrays;
import java.util.List;

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
