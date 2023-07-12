package reforged.marcin.krysiak.basketstats.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import reforged.marcin.krysiak.basketstats.enums.MatchStatus;
import reforged.marcin.krysiak.basketstats.models.Team;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
public class MatchWithScoreDTO {

    private Long id;

    private Team teamA;

    private Team teamB;

    private LocalDateTime matchDate;

    private String place;

    private MatchStatus matchStatus;

    private int teamAScore;

    private int teamBScore;

}
