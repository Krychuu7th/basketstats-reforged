import {Player} from "./player";

export class PlayerStats {
  id: number;
  player: Player;
  pts: number;
  pm2: number;
  pa2: number;
  pm3: number;
  pa3: number;
  ftm: number;
  fta: number;
  ast: number;
  blkm: number;
  blkg: number;
  offr: number;
  defr: number;
  tov: number;
  stl: number;
  pf: number;
  fd: number;
  eff: number;


  constructor(player: Player) {
    this.player = player;
    this.pts = 0;
    this.pm2 = 0;
    this.pa2 = 0;
    this.pm3 = 0;
    this.pa3 = 0;
    this.ftm = 0;
    this.fta = 0;
    this.ast = 0;
    this.blkm = 0;
    this.blkg = 0;
    this.offr = 0;
    this.defr = 0;
    this.tov = 0;
    this.stl = 0;
    this.pf = 0;
    this.fd = 0;
    this.eff = 0;
  }


}
