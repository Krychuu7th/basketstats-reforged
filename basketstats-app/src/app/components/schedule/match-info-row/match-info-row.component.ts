import { Component, Input, OnChanges } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { MatchStatus } from "../../../enums/match-status.enum";
import { Match } from "../../../models/match";
import { Team } from "../../../models/team";

@Component({
  selector: 'app-match-info-row',
  templateUrl: './match-info-row.component.html',
  styleUrls: ['./match-info-row.component.scss']
})
export class MatchInfoRowComponent implements OnChanges {

  @Input()
  match: Match;

  @Input()
  team: Team;

  @Input()
  schedule = false;

  opponents: Team;
  opponentsScore: number;
  teamScore: number;

  apiUrl = environment.api.url;

  MatchStatus = MatchStatus;

  constructor() { }

  ngOnChanges(): void {
    this.getMatchBaseInfoForTeam();
  }

  getMatchBaseInfoForTeam() {
    if(this.team) {
      this.opponents = this.match.teamA.id == this.team.id ? this.match.teamB : this.match.teamA;
      this.opponentsScore = this.match.teamA.id == this.team.id ? this.match.teamBScore : this.match.teamAScore;
      this.teamScore = this.match.teamA.id == this.team.id ? this.match.teamAScore : this.match.teamBScore;
    }
  }

}
