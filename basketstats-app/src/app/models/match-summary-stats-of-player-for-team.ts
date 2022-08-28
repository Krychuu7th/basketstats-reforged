import {Team} from "./team";

export class MatchSummaryStatsOfPlayerForTeam {
  team: Team;
  playersStats: any[];

  constructor(team: Team, matchSummaryStats: any[]) {
    this.team = team;
    this.playersStats = [];
    for (let playerStats of matchSummaryStats) {
      if(playerStats.player.team.id == this.team.id) {
        this.playersStats.push(playerStats);
      }
    }
  }
}
