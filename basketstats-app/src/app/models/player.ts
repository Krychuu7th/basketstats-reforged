import {Team} from "./team";
import {Position} from "../enums/position.enum";

export class Player {
  id: number;
  firstName: string;
  lastName: string;
  number: number;
  team: Team;
  position: Position;
  captain: boolean;
}
