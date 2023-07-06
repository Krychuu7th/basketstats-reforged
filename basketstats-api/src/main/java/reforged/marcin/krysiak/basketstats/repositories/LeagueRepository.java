package reforged.marcin.krysiak.basketstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import reforged.marcin.krysiak.basketstats.models.League;

import java.util.Optional;

public interface LeagueRepository extends JpaRepository<League, Long>, JpaSpecificationExecutor<League> {
    Optional<League> findByName(String name);
}
