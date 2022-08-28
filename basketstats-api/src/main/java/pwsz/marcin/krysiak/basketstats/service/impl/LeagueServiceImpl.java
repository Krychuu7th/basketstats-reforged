package pwsz.marcin.krysiak.basketstats.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pwsz.marcin.krysiak.basketstats.models.League;
import pwsz.marcin.krysiak.basketstats.repositories.LeagueRepository;
import pwsz.marcin.krysiak.basketstats.service.LeagueService;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LeagueServiceImpl implements LeagueService {

    @Autowired
    LeagueRepository leagueRepository;

    @Override
    public List<League> getAllLeagues() {
        return leagueRepository.findAllByOrderByIdDesc();
    }

    @Override
    public Optional<League> getTeamById(Long id) {
        return leagueRepository.findById(id);
    }

    @Override
    public Optional<League> getLeagueByNane(String name) {
        return leagueRepository.findByName(name);
    }

    @Override
    public League createLeague(League league) {
        return leagueRepository.save(league);
    }

    @Override
    public void updateLeague(Long id, League league){
        if (this.leagueRepository.findById(id).isPresent()) {
            League newLeague = this.leagueRepository.findById(id).get();
            newLeague.setName(league.getName());

            this.leagueRepository.save(newLeague);

        } else {
            throw new RuntimeException("League with id " + id + " doesn't exists");
        }
    }

    @Override
    public void deleteLeague(Long id) {
        leagueRepository.deleteById(id);
    }
}
