package reforged.marcin.krysiak.basketstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reforged.marcin.krysiak.basketstats.models.League;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeagueRepository extends JpaRepository<League, Long> {
    List<League> findAllByOrderByIdDesc();
    Optional<League> findByName(String name);
}
