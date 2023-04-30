package reforged.marcin.krysiak.basketstats.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import reforged.marcin.krysiak.basketstats.models.League;

import java.util.List;
import java.util.Optional;

public interface LeagueService {
    Page<League> getLeaguesBySpec(Specification<League> spec, Pageable pageable);
    List<League> getAllLeagues();
    Optional<League> getTeamById(Long id);
    Optional<League> getLeagueByNane(String name);
    League createLeague(League league);
    void updateLeague(Long id, League league);
    void deleteLeague(Long id);
}
