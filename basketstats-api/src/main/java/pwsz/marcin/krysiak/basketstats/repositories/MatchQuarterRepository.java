package pwsz.marcin.krysiak.basketstats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pwsz.marcin.krysiak.basketstats.models.Match;
import pwsz.marcin.krysiak.basketstats.models.MatchQuarter;

import java.util.List;

public interface MatchQuarterRepository extends JpaRepository<MatchQuarter, Long> {
    List<MatchQuarter> findAllByMatchOrderByQuarterAsc(Match match);
}
