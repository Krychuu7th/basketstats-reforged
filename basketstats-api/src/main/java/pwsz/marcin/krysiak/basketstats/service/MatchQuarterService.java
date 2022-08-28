package pwsz.marcin.krysiak.basketstats.service;

import pwsz.marcin.krysiak.basketstats.dto.MatchQuarterStatsSaveRequestDTO;
import pwsz.marcin.krysiak.basketstats.models.Match;
import pwsz.marcin.krysiak.basketstats.models.MatchQuarter;

import java.util.List;

public interface MatchQuarterService {
    List<MatchQuarter> getAllByMatch(Match match);

    MatchQuarter saveMatchQuarterStats(MatchQuarterStatsSaveRequestDTO request);
}
