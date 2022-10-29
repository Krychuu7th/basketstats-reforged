package reforged.marcin.krysiak.basketstats.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reforged.marcin.krysiak.basketstats.dto.TeamWithLogoDTO;
import reforged.marcin.krysiak.basketstats.exceptions.LeagueNotFoundException;
import reforged.marcin.krysiak.basketstats.models.Team;
import reforged.marcin.krysiak.basketstats.repositories.LeagueRepository;
import reforged.marcin.krysiak.basketstats.repositories.TeamRepository;
import reforged.marcin.krysiak.basketstats.service.TeamService;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    @Override
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @Override
    public List<Team> getAllTeamsByLeague(Long id) {
        return teamRepository.findAllByLeagueId(id);
    }

    @Override
    public Optional<Team> getTeamById(Long id) {
        return teamRepository.findById(id);
    }

    @Override
    public Team getTeamByName(String name) {
        return teamRepository.findByName(name);
    }

    @Override
    public Team createTeam(TeamWithLogoDTO team) throws Exception {
        Team newTeam = new Team();
        newTeam.setName(team.getName());
        newTeam.setLeague(leagueRepository.findById(team.getLeagueId())
                .orElseThrow(LeagueNotFoundException::new));
        if(team.getLogoFile().getContentType() != null && team.getLogoFile().getContentType().contains("image")) {
            newTeam.setLogo(team.getLogoFile().getOriginalFilename());
            newTeam.setData(team.getLogoFile().getBytes());
            newTeam.setType(team.getLogoFile().getContentType());
        }

        return teamRepository.save(newTeam);
    }

    @Override
    public void updateTeam(Long id, TeamWithLogoDTO team) throws Exception{
        if (this.teamRepository.findById(id).isPresent()) {

            Team newTeam = this.teamRepository.findById(id).get();
            newTeam.setName(team.getName());
            newTeam.setLeague(leagueRepository.findById(team.getLeagueId())
                    .orElseThrow(LeagueNotFoundException::new));
            if(team.getLogoFile().getContentType() != null && team.getLogoFile().getContentType().contains("image")) {
                newTeam.setLogo(team.getLogoFile().getOriginalFilename());
                newTeam.setData(team.getLogoFile().getBytes());
                newTeam.setType(team.getLogoFile().getContentType());
            }

            teamRepository.save(newTeam);
        } else {
            throw new RuntimeException("User with id " + id + " doesn't exists");
        }
    }

    @Override
    public void deleteTeam(Long id) {
        teamRepository.deleteById(id);
    }
}
