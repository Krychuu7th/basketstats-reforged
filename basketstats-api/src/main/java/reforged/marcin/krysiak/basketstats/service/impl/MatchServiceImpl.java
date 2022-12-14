package reforged.marcin.krysiak.basketstats.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reforged.marcin.krysiak.basketstats.config.enums.MatchStatus;
import reforged.marcin.krysiak.basketstats.dto.MatchStatsDTO;
import reforged.marcin.krysiak.basketstats.dto.MatchWithScoreDTO;
import reforged.marcin.krysiak.basketstats.exceptions.MatchIsFinishedException;
import reforged.marcin.krysiak.basketstats.exceptions.TeamNotFoundException;
import reforged.marcin.krysiak.basketstats.models.Match;
import reforged.marcin.krysiak.basketstats.models.MatchQuarter;
import reforged.marcin.krysiak.basketstats.models.PlayerStats;
import reforged.marcin.krysiak.basketstats.repositories.MatchQuarterRepository;
import reforged.marcin.krysiak.basketstats.repositories.MatchRepository;
import reforged.marcin.krysiak.basketstats.repositories.custom.MatchStatsRepositoryCustom;
import reforged.marcin.krysiak.basketstats.service.MatchService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MatchServiceImpl implements MatchService {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private MatchQuarterRepository matchQuarterRepository;

    @Autowired
    private MatchStatsRepositoryCustom matchStatsRepositoryCustom;

    @Override
    public List<MatchWithScoreDTO> getAllMatches() {
        List<Match> matchList = matchRepository.findAll();
        return convertMatchListToMatchWithScoreDTOList(matchList);
    }

    @Override
    public List<MatchWithScoreDTO> getAllMatchesByTeamId(Long id) {
        List<Match> matchList = matchRepository.findMatchesByTeamId(id);
        return convertMatchListToMatchWithScoreDTOList(matchList);
    }

    @Override
    public List<MatchWithScoreDTO> getAllMatchesByLeagueId(Long id) {
        List<Match> matchList = matchRepository.findMatchesByLeagueId(id);
        return convertMatchListToMatchWithScoreDTOList(matchList);
    }

    @Override
    public List<MatchWithScoreDTO> getAllMatchesByLeagueIdAndUserId(Long leagueId, Long userId) {
        List<Match> matchList = matchRepository.findMatchesByLeagueIdAndUserId(leagueId, userId);
        return convertMatchListToMatchWithScoreDTOList(matchList);
    }

    @Override
    public MatchWithScoreDTO getMatchWithScoreById(Long id) throws Exception {
        Match match = matchRepository.findById(id)
                .orElseThrow(TeamNotFoundException::new);
        return convertMatchToMatchWithScoreDTO(match);
    }

    @Override
    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }

    @Override
    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    @Override
    public void updateMatch(Long id, Match match){
        if (matchRepository.findById(id).isPresent()) {

            Match newMatch = matchRepository.findById(id).get();
            if (newMatch.getMatchStatus() != MatchStatus.DONE) {

                newMatch.setMatchDate(match.getMatchDate());
                newMatch.setPlace(match.getPlace());
                newMatch.setUser(match.getUser());
                if(match.getMatchStatus() == MatchStatus.PLANNED || match.getMatchStatus() == null) {
                    newMatch.setMatchStatus(MatchStatus.PLANNED);
                } else {
                    newMatch.setMatchStatus(match.getMatchStatus());
                }


                this.matchRepository.save(newMatch);
            } else {
                throw new MatchIsFinishedException();
            }
        } else {
            throw new RuntimeException("Match with id " + id + " doesn't exists");
        }
    }

    @Override
    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }

    @Override
    public List<MatchStatsDTO> getMatchStats(Long matchId) throws Exception {
        return matchStatsRepositoryCustom.getMatchStats(matchId);
    }

    private MatchWithScoreDTO convertMatchToMatchWithScoreDTO(Match match) {
        MatchWithScoreDTO matchWithScoreDTO;
        if(match.getMatchStatus() == MatchStatus.DONE) {
            int teamAScore = 0, teamBScore = 0;
            List<MatchQuarter> matchQuarterList = matchQuarterRepository.findAllByMatchOrderByQuarterAsc(match);
            for (MatchQuarter matchQuarter: matchQuarterList) {
                for (PlayerStats playerStats : matchQuarter.getPlayersStats()) {
                    if(playerStats.getPlayer().getTeam() == match.getTeamA()) {
                        teamAScore += playerStats.getPts();
                    }
                    else if(playerStats.getPlayer().getTeam() == match.getTeamB()) {
                        teamBScore += playerStats.getPts();
                    }
                }
            }
            matchWithScoreDTO = new MatchWithScoreDTO(match.getId(), match.getTeamA(),
                    match.getTeamB(), match.getMatchDate(), match.getPlace(), match.getMatchStatus(),
                    teamAScore, teamBScore, match.getUser());
        } else {
            matchWithScoreDTO = new MatchWithScoreDTO(match.getId(), match.getTeamA(),
                    match.getTeamB(), match.getMatchDate(), match.getPlace(), match.getMatchStatus(),
                    0, 0, match.getUser());
        }

        return matchWithScoreDTO;
    }

    private List<MatchWithScoreDTO> convertMatchListToMatchWithScoreDTOList(List<Match> matchList) {
        List<MatchWithScoreDTO> matchWithScoreDTOList = new ArrayList<>();

        for (Match match: matchList) {
            if(match.getMatchStatus() == MatchStatus.DONE) {
                int teamAScore = 0, teamBScore = 0;
                List<MatchQuarter> matchQuarterList = matchQuarterRepository.findAllByMatchOrderByQuarterAsc(match);
                for (MatchQuarter matchQuarter: matchQuarterList) {
                    for (PlayerStats playerStats : matchQuarter.getPlayersStats()) {
                        if(playerStats.getPlayer().getTeam() == match.getTeamA()) {
                            teamAScore += playerStats.getPts();
                        }
                        else if(playerStats.getPlayer().getTeam() == match.getTeamB()) {
                            teamBScore += playerStats.getPts();
                        }
                    }
                }

                MatchWithScoreDTO matchWithScoreDTO = new MatchWithScoreDTO(match.getId(), match.getTeamA(),
                        match.getTeamB(), match.getMatchDate(), match.getPlace(), match.getMatchStatus(),
                        teamAScore, teamBScore, match.getUser());
                matchWithScoreDTOList.add(matchWithScoreDTO);
            } else {
                MatchWithScoreDTO matchWithScoreDTO = new MatchWithScoreDTO(match.getId(), match.getTeamA(),
                        match.getTeamB(), match.getMatchDate(), match.getPlace(), match.getMatchStatus(),
                        0, 0, match.getUser());
                matchWithScoreDTOList.add(matchWithScoreDTO);
            }
        }
        return matchWithScoreDTOList;
    }


}
