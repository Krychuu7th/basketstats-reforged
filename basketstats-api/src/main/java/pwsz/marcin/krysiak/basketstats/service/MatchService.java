package pwsz.marcin.krysiak.basketstats.service;

import pwsz.marcin.krysiak.basketstats.dto.MatchStatsDTO;
import pwsz.marcin.krysiak.basketstats.dto.MatchWithScoreDTO;
import pwsz.marcin.krysiak.basketstats.models.Match;

import java.util.List;
import java.util.Optional;

public interface MatchService {
    List<MatchWithScoreDTO> getAllMatches();
    List<MatchWithScoreDTO> getAllMatchesByTeamId(Long id);
    List<MatchWithScoreDTO> getAllMatchesByLeagueId(Long id);
    List<MatchWithScoreDTO> getAllMatchesByLeagueIdAndUserId(Long leagueId, Long userId);
    MatchWithScoreDTO getMatchWithScoreById(Long id) throws Exception;
    Optional<Match> getMatchById(Long id);
    Match createMatch(Match match);
    void updateMatch(Long id, Match match);
    void deleteMatch(Long id);
    List<MatchStatsDTO> getMatchStats(Long matchId) throws Exception;
}
