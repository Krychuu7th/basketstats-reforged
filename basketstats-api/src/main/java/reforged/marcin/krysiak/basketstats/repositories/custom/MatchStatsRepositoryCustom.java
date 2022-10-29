package reforged.marcin.krysiak.basketstats.repositories.custom;

import reforged.marcin.krysiak.basketstats.dto.MatchStatsDTO;

import java.util.List;

public interface MatchStatsRepositoryCustom {
    List<MatchStatsDTO> getMatchStats(Long matchId) throws Exception;
}
