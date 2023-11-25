package reforged.marcin.krysiak.basketstats.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import reforged.marcin.krysiak.basketstats.dto.TeamDto;
import reforged.marcin.krysiak.basketstats.dto.TeamFormDTO;
import reforged.marcin.krysiak.basketstats.models.Team;

import java.util.List;

public interface TeamService {
    Page<TeamDto> getAllBySpec(Specification<Team> spec, Pageable pageable);
    Page<TeamDto> getAllForLeagueBySpec(Long leagueId, Specification<Team> spec, Pageable pageable);
    List<TeamDto> getAll(Specification<Team> spec);
    TeamDto getById(Long id);
    Team getEntityById(Long id);
    TeamDto getByName(String name);
    TeamDto create(TeamFormDTO team);
    TeamDto update(Long id, TeamFormDTO team);
    void delete(Long id);
}
