package reforged.marcin.krysiak.basketstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import reforged.marcin.krysiak.basketstats.models.Match;
import reforged.marcin.krysiak.basketstats.models.MatchQuarter;

import java.util.List;

public interface MatchQuarterRepository extends JpaRepository<MatchQuarter, Long> {
    List<MatchQuarter> findAllByMatchOrderByQuarterAsc(Match match);
}
