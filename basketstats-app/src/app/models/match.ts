import {Team} from "./team";
import {User} from "./user";
import {MatchStatus} from "../enums/match-status.enum";

export class Match {
  id: number;
  teamA: Team;
  teamB: Team;
  matchDate: Date;
  place: string;
  matchStatus: MatchStatus;
  teamAScore: number;
  teamBScore: number;
  user: User;
}
