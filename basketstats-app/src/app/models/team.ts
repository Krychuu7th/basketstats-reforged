import { League } from "./league.model";

export class Team {
  id: number;
  name: string;
  logo: string;
  league: League;
  logoFile: Blob;
}
