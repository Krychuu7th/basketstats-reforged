package reforged.marcin.krysiak.basketstats.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class MatchWithScoreDTO {

    private MatchDto match;

    private int teamAScore;

    private int teamBScore;

}
