package reforged.marcin.krysiak.basketstats.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reforged.marcin.krysiak.basketstats.dto.MatchStatsDTO;
import reforged.marcin.krysiak.basketstats.dto.MatchWithScoreDTO;
import reforged.marcin.krysiak.basketstats.enums.MatchStatus;
import reforged.marcin.krysiak.basketstats.exceptions.MatchIsFinishedException;
import reforged.marcin.krysiak.basketstats.exceptions.TeamNotFoundException;
import reforged.marcin.krysiak.basketstats.mapper.MatchMapper;
import reforged.marcin.krysiak.basketstats.models.Match;
import reforged.marcin.krysiak.basketstats.models.MatchQuarter;
import reforged.marcin.krysiak.basketstats.models.PlayerStats;
import reforged.marcin.krysiak.basketstats.providers.UserProvider;
import reforged.marcin.krysiak.basketstats.repositories.MatchQuarterRepository;
import reforged.marcin.krysiak.basketstats.repositories.MatchRepository;
import reforged.marcin.krysiak.basketstats.repositories.custom.MatchStatsRepositoryCustom;
import reforged.marcin.krysiak.basketstats.service.MatchService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {

    private final MatchRepository matchRepository;
    private final MatchQuarterRepository matchQuarterRepository;
    private final MatchStatsRepositoryCustom matchStatsRepositoryCustom;
    private final UserProvider userProvider;
    private final MatchMapper mapper;

    @Override
    public List<MatchWithScoreDTO> getAllMatches() {
        List<Match> matchList = matchRepository.findAll();
        return mapWithScore(matchList);
    }

    @Override
    public List<MatchWithScoreDTO> getAllMatchesByTeamId(Long id) {
        List<Match> matchList = matchRepository.findMatchesByTeamId(id);
        return mapWithScore(matchList);
    }

    @Override
    public List<MatchWithScoreDTO> getAllMatchesByLeagueId(Long id) {
        List<Match> matchList = matchRepository.findMatchesByLeagueId(id);
        return mapWithScore(matchList);
    }

    @Override
    public List<MatchWithScoreDTO> getAllMatchesByLeagueIdAndUserId(Long leagueId, Long userId) {
//        List<Match> matchList = matchRepository.findMatchesByLeagueIdAndUserId(leagueId, userId);
        List<Match> matchList = matchRepository.findMatchesByLeagueId(leagueId);
        return mapWithScore(matchList);
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
    public void updateMatch(Long id, Match match) {
        if (matchRepository.findById(id).isPresent()) {

            Match newMatch = matchRepository.findById(id).get();
            if (newMatch.getMatchStatus() != MatchStatus.DONE) {

                newMatch.setMatchDate(match.getMatchDate());
                newMatch.setPlace(match.getPlace());
                newMatch.setCreatedBy(userProvider.getUserEmail());
                if (match.getMatchStatus() == MatchStatus.PLANNED || match.getMatchStatus() == null) {
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
        if (match.getMatchStatus() == MatchStatus.DONE) {
            int teamAScore = 0, teamBScore = 0;
            List<MatchQuarter> matchQuarterList = matchQuarterRepository.findAllByMatchOrderByQuarterAsc(match);
            for (MatchQuarter matchQuarter : matchQuarterList) {
                for (PlayerStats playerStats : matchQuarter.getPlayersStats()) {
                    if (playerStats.getPlayer().getTeam() == match.getTeamA()) {
                        teamAScore += playerStats.getPts();
                    } else if (playerStats.getPlayer().getTeam() == match.getTeamB()) {
                        teamBScore += playerStats.getPts();
                    }
                }
            }
            matchWithScoreDTO = new MatchWithScoreDTO(mapper.toDto(match),
                    teamAScore, teamBScore);
        } else {
            matchWithScoreDTO = new MatchWithScoreDTO(mapper.toDto(match),
                    0, 0);
        }

        return matchWithScoreDTO;
    }

    private List<MatchWithScoreDTO> mapWithScore(List<Match> matchList) {
        List<MatchWithScoreDTO> matchWithScoreDTOList = new ArrayList<>();

        for (Match match : matchList) {
            if (match.getMatchStatus() == MatchStatus.DONE) {
                int teamAScore = 0, teamBScore = 0;
                List<MatchQuarter> matchQuarterList = matchQuarterRepository.findAllByMatchOrderByQuarterAsc(match);
                for (MatchQuarter matchQuarter : matchQuarterList) {
                    for (PlayerStats playerStats : matchQuarter.getPlayersStats()) {
                        if (playerStats.getPlayer().getTeam() == match.getTeamA()) {
                            teamAScore += playerStats.getPts();
                        } else if (playerStats.getPlayer().getTeam() == match.getTeamB()) {
                            teamBScore += playerStats.getPts();
                        }
                    }
                }

                MatchWithScoreDTO matchWithScoreDTO = new MatchWithScoreDTO(mapper.toDto(match),
                        teamAScore, teamBScore);
                matchWithScoreDTOList.add(matchWithScoreDTO);
            } else {
                MatchWithScoreDTO matchWithScoreDTO = new MatchWithScoreDTO(mapper.toDto(match),
                        0, 0);
                matchWithScoreDTOList.add(matchWithScoreDTO);
            }
        }
        return matchWithScoreDTOList;
    }


}
