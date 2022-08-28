import {PlayerStats} from "./player-stats";
import {Team} from "./team";
import {MatchQuarter} from "./match-quarter";

export class MatchQuarterStatsForTeam {
  team: Team;
  playersStats: PlayerStats[];


  constructor(team: Team, matchQuarter: MatchQuarter) {
    this.team = team;
    this.playersStats = [];
    for (let matchQuarterPlayerStats of matchQuarter.playersStats) {
      if(matchQuarterPlayerStats.player.team.id == this.team.id) {
        this.playersStats.push(matchQuarterPlayerStats);
      }
    }
  }
}
