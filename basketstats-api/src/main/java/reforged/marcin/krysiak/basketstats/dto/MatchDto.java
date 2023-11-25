package reforged.marcin.krysiak.basketstats.dto;

import lombok.Data;
import reforged.marcin.krysiak.basketstats.enums.MatchStatus;

import java.time.LocalDateTime;

@Data
public class MatchDto {
    private Long id;
    private TeamDto teamA;
    private TeamDto teamB;
    private LocalDateTime matchDate;
    private String place;
    private MatchStatus matchStatus;
}
