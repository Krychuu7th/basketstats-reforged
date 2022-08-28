import {StatType} from "../enums/stat-type";

export class LastStat {
  teamId: number;
  playerId: number;
  statType: StatType;
  quantity: number;
  playerNumber: number;


  constructor(teamId: number, playerId: number, statType: StatType, quantity: number, playerNumber: number) {
    this.teamId = teamId;
    this.playerId = playerId;
    this.statType = statType;
    this.quantity = quantity;
    this.playerNumber = playerNumber;
  }
}
