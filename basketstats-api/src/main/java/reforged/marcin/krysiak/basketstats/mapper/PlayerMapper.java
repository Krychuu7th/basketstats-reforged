package reforged.marcin.krysiak.basketstats.mapper;

import org.mapstruct.Mapper;
import reforged.marcin.krysiak.basketstats.dto.PlayerDto;
import reforged.marcin.krysiak.basketstats.models.Player;

@Mapper(componentModel = "spring", uses = {TeamMapper.class})
public abstract class PlayerMapper implements CommonMapper<Player, PlayerDto> {
}
