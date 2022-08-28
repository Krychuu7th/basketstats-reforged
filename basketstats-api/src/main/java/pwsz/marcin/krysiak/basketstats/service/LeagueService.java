package pwsz.marcin.krysiak.basketstats.service;

import pwsz.marcin.krysiak.basketstats.models.League;

import java.util.List;
import java.util.Optional;

public interface LeagueService {
    List<League> getAllLeagues();
    Optional<League> getTeamById(Long id);
    Optional<League> getLeagueByNane(String name);
    League createLeague(League league);
    void updateLeague(Long id, League league);
    void deleteLeague(Long id);
}
