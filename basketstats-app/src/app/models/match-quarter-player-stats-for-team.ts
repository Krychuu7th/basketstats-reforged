import {PlayerStats} from "./player-stats";
import {TeamWithoutLogo} from "./team-without-logo";

export class MatchQuarterStatsOfPlayerForTeam {
  quarter: number;
  team: TeamWithoutLogo;
  playerStats: PlayerStats[];
  teamFouls: number;
}
