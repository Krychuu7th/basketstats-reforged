package reforged.marcin.krysiak.basketstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reforged.marcin.krysiak.basketstats.models.Stat;

import java.util.List;

@Repository
public interface StatRepository extends JpaRepository<Stat, Long> {
    List<Stat> findByPlayerId(Long playerId);

    List<Stat> findByMatchQuarterId(Long matchQuarterId);

    List<Stat> findByMatchId(Long matchId);
}
