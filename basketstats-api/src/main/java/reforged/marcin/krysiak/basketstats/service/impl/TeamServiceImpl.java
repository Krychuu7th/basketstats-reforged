package reforged.marcin.krysiak.basketstats.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reforged.marcin.krysiak.basketstats.dto.TeamDto;
import reforged.marcin.krysiak.basketstats.dto.TeamFormDTO;
import reforged.marcin.krysiak.basketstats.exceptions.TeamNotFoundException;
import reforged.marcin.krysiak.basketstats.mapper.TeamMapper;
import reforged.marcin.krysiak.basketstats.models.Team;
import reforged.marcin.krysiak.basketstats.repositories.LeagueRepository;
import reforged.marcin.krysiak.basketstats.repositories.TeamRepository;
import reforged.marcin.krysiak.basketstats.service.TeamService;
import reforged.marcin.krysiak.basketstats.service.ftp.FtpService;
import reforged.marcin.krysiak.basketstats.utils.SpecificationUtils;

import javax.annotation.Nullable;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final String TEAMS_FTP_DIRECTORY = "/teams";
    private final TeamRepository teamRepository;
    private final LeagueRepository leagueRepository;
    private final TeamMapper mapper;
    private final SpecificationUtils<Team> specificationUtils;
    private final FtpService ftpService;

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
    public TeamDto create(TeamFormDTO teamDto) {
        if (Objects.nonNull(teamDto.getFileContent())) {
            return mapper.toDto(teamRepository.save(mapWithFile(teamDto, null)));
        }

        return mapper.toDto(teamRepository.save(mapper.toEntity(teamDto)));
    }

    @Override
    @Transactional
    public TeamDto update(Long id, TeamFormDTO teamDto) {
        Team team = findById(id);
        if (Objects.nonNull(teamDto.getFileContent())) {
            return mapper.toDto(teamRepository.save(mapWithFile(teamDto, team)));
        }

        return mapper.toDto(teamRepository.save(mapper.toEntity(teamDto)));
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

    private Team mapWithFile(TeamFormDTO teamDto, @Nullable Team savedTeam) {
        Team team = mapper.toEntity(teamDto);
        team.setFilePath(ftpService.uploadFile(teamDto.getFileContent(), TEAMS_FTP_DIRECTORY));
        team.setFileName(teamDto.getFileName());

        if (Objects.nonNull(savedTeam)) {
            deleteTeamFile(savedTeam);
        }

        return team;
    }

    private void deleteTeamFile(Team team) {
        ftpService.deleteFile(team.getFilePath());
    }

    private boolean hasValidImage(TeamFormDTO teamDto) {
        return Objects.nonNull(teamDto.getFileContent())
                && Objects.nonNull(teamDto.getFileContent().getContentType())
                && teamDto.getFileContent().getContentType().contains("image");
    }
}
