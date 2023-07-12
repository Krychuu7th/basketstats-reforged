package reforged.marcin.krysiak.basketstats.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reforged.marcin.krysiak.basketstats.dto.TeamDto;
import reforged.marcin.krysiak.basketstats.dto.TeamWithImageDTO;
import reforged.marcin.krysiak.basketstats.exceptions.LeagueNotFoundException;
import reforged.marcin.krysiak.basketstats.exceptions.TeamNotFoundException;
import reforged.marcin.krysiak.basketstats.mapper.TeamMapper;
import reforged.marcin.krysiak.basketstats.models.Team;
import reforged.marcin.krysiak.basketstats.repositories.LeagueRepository;
import reforged.marcin.krysiak.basketstats.repositories.TeamRepository;
import reforged.marcin.krysiak.basketstats.service.TeamService;
import reforged.marcin.krysiak.basketstats.utils.SpecificationUtils;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final LeagueRepository leagueRepository;
    private final TeamMapper mapper;
    private final SpecificationUtils<Team> specificationUtils;

    @Override
    public Page<TeamDto> getAllBySpec(Specification<Team> spec, Pageable pageable) {
        return teamRepository.findAll(spec, pageable).map(mapper::toDto);
    }

    @Override
    public Page<TeamDto> getAllForLeagueBySpec(Long leagueId, Specification<Team> spec, Pageable pageable) {
        return teamRepository.findAll(specificationUtils.getAndSpec(spec, leagueIdEqualSpec(leagueId)), pageable).map(mapper::toDto);
    }

    @Override
    public List<TeamDto> getAll(Specification<Team> spec) {
        return mapper.toDtoList(teamRepository.findAll(spec));
    }

    @Override
    public TeamDto getById(Long id) {
        return mapper.toDto(teamRepository.findById(id).orElseThrow(TeamNotFoundException::new));
    }

    @Override
    public Team getEntityById(Long id) {
        return this.findById(id);
    }

    @Override
    public TeamDto getByName(String name) {
        return mapper.toDto(teamRepository.findByName(name));
    }

    @Override
    @Transactional
    public TeamDto create(TeamWithImageDTO teamDto) {
        Team newTeam = mapper.toEntity(teamDto);
        setTeamImage(teamDto, newTeam);
        return mapper.toDto(teamRepository.save(newTeam));
    }

    private void setTeamImage(TeamWithImageDTO teamDto, Team newTeam) {
        if (hasValidImage(teamDto)) {
            newTeam.setImageName(teamDto.getImageFile().getOriginalFilename());
            try {
                newTeam.setImageFile(teamDto.getImageFile().getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            newTeam.setType(teamDto.getImageFile().getContentType());
        }
    }

    @Override
    @Transactional
    public TeamDto update(Long id, TeamWithImageDTO teamDto) {
        Team team = this.findById(id);
        team.setName(teamDto.getName());
        team.setLeague(leagueRepository.findById(teamDto.getLeagueId())
                .orElseThrow(LeagueNotFoundException::new));
        setTeamImage(teamDto, team);

        return mapper.toDto(teamRepository.save(team));
    }

    @Override
    public void delete(Long id) {
        teamRepository.deleteById(id);
    }

    private Specification<Team> leagueIdEqualSpec(Long leagueId) {
        return (root, query, criteriaBuilder)
                -> criteriaBuilder.equal(root.get("league").get("id"), leagueId);
    }

    private Team findById(Long id) {
        return this.teamRepository.findById(id).orElseThrow(TeamNotFoundException::new);
    }

    private boolean hasValidImage(TeamWithImageDTO teamDto) {
        return Objects.nonNull(teamDto.getImageFile())
                && Objects.nonNull(teamDto.getImageFile().getContentType())
                && teamDto.getImageFile().getContentType().contains("image");
    }
}
