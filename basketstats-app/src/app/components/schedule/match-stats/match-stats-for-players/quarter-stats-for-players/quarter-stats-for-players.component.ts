import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatchQuarter} from "../../../../../models/match-quarter";
import {Team} from "../../../../../models/team";
import {MatchQuarterStatsForTeam} from "../../../../../models/match-quarter-for-team";

@Component({
  selector: 'app-quarter-stats-for-players',
  templateUrl: './quarter-stats-for-players.component.html',
  styleUrls: ['./quarter-stats-for-players.component.scss']
})
export class QuarterStatsForPlayersComponent implements OnChanges {

  @Input()
  matchQuarterStats: MatchQuarter;

  @Input()
  teamA: Team;

  @Input()
  teamB: Team;

  matchQuarterStatsForTeamA: MatchQuarterStatsForTeam;
  matchQuarterStatsForTeamB: MatchQuarterStatsForTeam;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.setDefaultValuesForTeams();
    }
  }

  setDefaultValuesForTeams() {
    this.matchQuarterStatsForTeamA = new MatchQuarterStatsForTeam(this.teamA, this.matchQuarterStats);
    this.matchQuarterStatsForTeamB = new MatchQuarterStatsForTeam(this.teamB, this.matchQuarterStats);
  }
}
