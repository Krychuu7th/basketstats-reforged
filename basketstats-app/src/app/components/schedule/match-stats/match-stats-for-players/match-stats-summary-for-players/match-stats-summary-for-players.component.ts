import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatchQuarter} from "../../../../../models/match-quarter";
import {Team} from "../../../../../models/team";
import {MatchQuarterStatsForTeam} from "../../../../../models/match-quarter-for-team";
import {MatchSummaryStatsOfPlayerForTeam} from "../../../../../models/match-summary-stats-of-player-for-team";

@Component({
  selector: 'app-match-stats-summary-for-players',
  templateUrl: './match-stats-summary-for-players.component.html',
  styleUrls: ['./match-stats-summary-for-players.component.scss']
})
export class MatchStatsSummaryForPlayersComponent implements OnChanges {

  @Input()
  matchPlayersSummaryStats;

  @Input()
  teamA: Team;

  @Input()
  teamB: Team;

  matchSummaryStatsOfPlayersForTeamA: MatchSummaryStatsOfPlayerForTeam;
  matchSummaryStatsOfPlayersForTeamB: MatchSummaryStatsOfPlayerForTeam;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if(this.matchPlayersSummaryStats) {
        this.setDefaultValuesForTeams();
      }
    }
  }

  setDefaultValuesForTeams() {
    this.matchSummaryStatsOfPlayersForTeamA = new MatchSummaryStatsOfPlayerForTeam(this.teamA, this.matchPlayersSummaryStats);
    this.matchSummaryStatsOfPlayersForTeamB = new MatchSummaryStatsOfPlayerForTeam(this.teamB, this.matchPlayersSummaryStats);
  }
}
