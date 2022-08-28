import {Match} from "./match";
import {PlayerStats} from "./player-stats";

export class MatchQuarter {
  id: number;
  match: Match;
  playersStats: PlayerStats[];
  quarter: number;
}
