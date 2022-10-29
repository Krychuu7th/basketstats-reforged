package reforged.marcin.krysiak.basketstats.dto;

import lombok.Getter;
import lombok.Setter;
import reforged.marcin.krysiak.basketstats.models.PlayerStats;

@Getter
@Setter
public class MatchQuarterStatsSaveRequestDTO {
    Long matchId;
    int quarter;
    PlayerStats[] teamAStats;
    PlayerStats[] teamBStats;

}
