package pwsz.marcin.krysiak.basketstats.service;

import org.springframework.web.multipart.MultipartFile;
import pwsz.marcin.krysiak.basketstats.dto.TeamWithLogoDTO;
import pwsz.marcin.krysiak.basketstats.models.Team;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public interface TeamService {
    List<Team> getAllTeams();
    List<Team> getAllTeamsByLeague(Long id);
    Optional<Team> getTeamById(Long id);
    Team getTeamByName(String name);
    Team createTeam(TeamWithLogoDTO team) throws Exception;
    void updateTeam(Long id, TeamWithLogoDTO team) throws Exception;
    void deleteTeam(Long id);
}
