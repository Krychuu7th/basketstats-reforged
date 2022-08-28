package pwsz.marcin.krysiak.basketstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pwsz.marcin.krysiak.basketstats.models.Team;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findAllByLeagueId(Long leagueId);
    Team findByName(String name);
}
