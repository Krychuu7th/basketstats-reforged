import { FileDetails } from "../shared/model/image-file";
import { League } from "./league.model";

export class Team {
  id: number;
  name: string;
  league: League;
  file: FileDetails;
}
