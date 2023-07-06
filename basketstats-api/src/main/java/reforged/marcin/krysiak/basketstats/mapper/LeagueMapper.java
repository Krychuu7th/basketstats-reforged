package reforged.marcin.krysiak.basketstats.mapper;

import org.mapstruct.Mapper;
import reforged.marcin.krysiak.basketstats.dto.LeagueDto;
import reforged.marcin.krysiak.basketstats.models.League;

@Mapper(componentModel = "spring")
public abstract class LeagueMapper implements CommonMapper<League, LeagueDto> {

}
