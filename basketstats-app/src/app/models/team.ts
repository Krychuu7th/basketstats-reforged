import { ImageFile } from "../shared/model/image-file";
import { League } from "./league.model";

export class Team extends ImageFile {
  id: number;
  name: string;
  league: League;
}
