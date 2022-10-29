package reforged.marcin.krysiak.basketstats.service;

import reforged.marcin.krysiak.basketstats.dto.MatchQuarterStatsSaveRequestDTO;
import reforged.marcin.krysiak.basketstats.models.Match;
import reforged.marcin.krysiak.basketstats.models.MatchQuarter;

import java.util.List;

public interface MatchQuarterService {
    List<MatchQuarter> getAllByMatch(Match match);

    MatchQuarter saveMatchQuarterStats(MatchQuarterStatsSaveRequestDTO request);
}
