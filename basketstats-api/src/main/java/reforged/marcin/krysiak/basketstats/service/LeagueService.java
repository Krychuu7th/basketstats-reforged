package reforged.marcin.krysiak.basketstats.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import reforged.marcin.krysiak.basketstats.dto.LeagueDto;
import reforged.marcin.krysiak.basketstats.models.League;

import java.util.List;
import java.util.Optional;

public interface LeagueService {
    Page<League> getAllBySpec(Specification<League> spec, Pageable pageable);
    List<League> getAll(Specification<League> spec);
    Optional<League> getById(Long id);
    Optional<League> getByNane(String name);
    LeagueDto create(LeagueDto league);
    LeagueDto update(Long id, LeagueDto league);
    void delete(Long id);
}
