package reforged.marcin.krysiak.basketstats.dto;

import lombok.Data;
import reforged.marcin.krysiak.basketstats.models.Match;

import java.util.List;

@Data
public class MatchQuarterDto {
    private Long id;
    private Match match;
    private int quarter;
    private List<PlayerStatsDto> playersStats;


    public MatchQuarterDto(Match match, int quarter, List<PlayerStatsDto> playersStats) {
        this.match = match;
        this.quarter = quarter;
        this.playersStats = playersStats;
    }
}
