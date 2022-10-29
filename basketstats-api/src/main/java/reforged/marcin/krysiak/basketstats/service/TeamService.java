package reforged.marcin.krysiak.basketstats.service;

import reforged.marcin.krysiak.basketstats.dto.TeamWithLogoDTO;
import reforged.marcin.krysiak.basketstats.models.Team;

import java.util.List;
import java.util.Optional;

public interface TeamService {
    List<Team> getAllTeams();
    List<Team> getAllTeamsByLeague(Long id);
    Optional<Team> getTeamById(Long id);
    Team getTeamByName(String name);
    Team createTeam(TeamWithLogoDTO team) throws Exception;
    void updateTeam(Long id, TeamWithLogoDTO team) throws Exception;
    void deleteTeam(Long id);
}
