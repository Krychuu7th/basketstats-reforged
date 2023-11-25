package reforged.marcin.krysiak.basketstats.values;

import lombok.Data;
import reforged.marcin.krysiak.basketstats.models.Match;

@Data
public class MatchWithScore {
    private Match match;

    private int teamAScore;

    private int teamBScore;
}
