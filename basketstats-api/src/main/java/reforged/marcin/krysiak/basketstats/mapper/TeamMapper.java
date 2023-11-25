package reforged.marcin.krysiak.basketstats.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import reforged.marcin.krysiak.basketstats.dto.TeamDto;
import reforged.marcin.krysiak.basketstats.dto.TeamFormDTO;
import reforged.marcin.krysiak.basketstats.models.League;
import reforged.marcin.krysiak.basketstats.models.Team;
import reforged.marcin.krysiak.basketstats.repositories.LeagueRepository;

import javax.annotation.Nullable;
import java.util.Optional;

@Mapper(componentModel = "spring", uses = {LeagueMapper.class})
public abstract class TeamMapper implements CommonMapper<Team, TeamDto> {

    @Autowired
    public LeagueRepository leagueRepository;

    @Override
    @Mapping(target = "file.fileName", source = "fileName")
    @Mapping(target = "file.filePath", source = "filePath")
    public abstract TeamDto toDto(Team entity);

    @Override
    @Mapping(target = "league", expression = "java(getLeagueById(teamDto.getLeague().getId()))")
    @Mapping(target = "fileName", source = "file.fileName")
    @Mapping(target = "filePath", source = "file.filePath")
    public abstract Team toEntity(TeamDto teamDto);

    @Mapping(target = "league", expression = "java(getLeagueById(teamDto.getLeagueId()))")
    public abstract Team toEntity(TeamFormDTO teamDto);

    public League getLeagueById(@Nullable Long leagueId) {
        return Optional.ofNullable(leagueId).flatMap(id -> leagueRepository.findById(id)).orElse(null);
    }
}
