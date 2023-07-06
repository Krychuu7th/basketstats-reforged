package reforged.marcin.krysiak.basketstats.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import reforged.marcin.krysiak.basketstats.dto.TeamDto;
import reforged.marcin.krysiak.basketstats.dto.TeamWithImageDTO;
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
    public abstract TeamDto toDto(Team entity);

    @Override
    @Mapping(target = "league", expression = "java(getLeagueById(teamDto.getLeague().getId()))")
    public abstract Team toEntity(TeamDto teamDto);

    @Mapping(target = "league", expression = "java(getLeagueById(teamDto.getLeagueId()))")
    @Mapping(target = "imageFile", ignore = true)
    public abstract Team toEntity(TeamWithImageDTO teamDto);

    public League getLeagueById(@Nullable Long leagueId) {
        return Optional.ofNullable(leagueId).flatMap(id -> leagueRepository.findById(id)).orElse(null);
    }
}
