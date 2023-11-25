package reforged.marcin.krysiak.basketstats.mapper;

import org.mapstruct.Mapper;
import reforged.marcin.krysiak.basketstats.dto.MatchDto;
import reforged.marcin.krysiak.basketstats.models.Match;

@Mapper(componentModel = "spring", uses = {LeagueMapper.class, TeamMapper.class})
public abstract class MatchMapper implements CommonMapper<Match, MatchDto> {
}
