import {PlayerStats} from "./player-stats";

export class MatchQuarterStatsSaveRequest {
  matchId: number;
  quarter: number;
  teamAStats: PlayerStats[];
  teamBStats: PlayerStats[];

  constructor(matchId: number, quarter: number, teamAStats: PlayerStats[], teamBStats: PlayerStats[]) {
    this.matchId = matchId;
    this.quarter = quarter;
    this.teamAStats = teamAStats;
    this.teamBStats = teamBStats;
  }
}
