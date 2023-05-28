package reforged.marcin.krysiak.basketstats.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reforged.marcin.krysiak.basketstats.models.League;
import reforged.marcin.krysiak.basketstats.repositories.LeagueRepository;
import reforged.marcin.krysiak.basketstats.service.LeagueService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LeagueServiceImpl implements LeagueService {

    private final LeagueRepository leagueRepository;

    @Override
    public Page<League> getAllBySpec(Specification<League> spec, Pageable pageable) {
        return leagueRepository.findAll(spec, pageable);
    }

    @Override
    public List<League> getAll() {
        return leagueRepository.findAllByOrderByIdDesc();
    }

    @Override
    public Optional<League> getById(Long id) {
        return leagueRepository.findById(id);
    }

    @Override
    public Optional<League> getByNane(String name) {
        return leagueRepository.findByName(name);
    }

    @Override
    @Transactional
    public League create(League league) {
        return leagueRepository.save(league);
    }

    @Override
    @Transactional
    public void update(Long id, League league) {
        if (this.leagueRepository.findById(id).isPresent()) {
            League newLeague = this.leagueRepository.findById(id).get();
            newLeague.setName(league.getName());

            this.leagueRepository.save(newLeague);

        } else {
            throw new RuntimeException("League with id " + id + " doesn't exists");
        }
    }

    @Override
    public void delete(Long id) {
        leagueRepository.deleteById(id);
    }
}
