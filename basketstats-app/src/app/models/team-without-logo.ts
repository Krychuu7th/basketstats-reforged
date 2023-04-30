import { League } from "./league.model";

export class TeamWithoutLogo {
  id: number;
  name: string;
  league: League;


  constructor(id: number, name: string, league: League) {
    this.id = id;
    this.name = name;
    this.league = league;
  }
}
