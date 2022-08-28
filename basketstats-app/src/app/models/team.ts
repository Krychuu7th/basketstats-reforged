import {League} from "./league";

export class Team {
  id: number;
  name: string;
  logo: string;
  league: League;
  logoFile: Blob;
}
