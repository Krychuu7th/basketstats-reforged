import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { environment } from "../../../../../../../environments/environment";
import { MatchQuarterStatsForTeam } from "../../../../../../models/match-quarter-for-team";
import { PlayerStats } from "../../../../../../models/player-stats";

@Component({
  selector: 'app-quarter-stats-for-players-by-team',
  templateUrl: './quarter-stats-for-players-by-team.component.html',
  styleUrls: ['./quarter-stats-for-players-by-team.component.scss']
})
export class QuarterStatsForPlayersByTeamComponent implements OnChanges {

  @Input()
  matchQuarterStatsForTeam: MatchQuarterStatsForTeam;

  playersStats: PlayerStats[];

  displayedColumns: string[] = ['player', 'pts', 'pm2', 'pm3', 'ftm', 'offr', 'defr', 'ast', 'blkm', 'pf'];
  dataSource: MatTableDataSource<PlayerStats>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  apiUrl = environment.api.url;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.matchQuarterStatsForTeam) {
      this.dataSource = new MatTableDataSource(this.matchQuarterStatsForTeam.playersStats);
      this.playersStats = this.matchQuarterStatsForTeam.playersStats;
      this.dataSource.sort = this.sort;
    }
  }
}
