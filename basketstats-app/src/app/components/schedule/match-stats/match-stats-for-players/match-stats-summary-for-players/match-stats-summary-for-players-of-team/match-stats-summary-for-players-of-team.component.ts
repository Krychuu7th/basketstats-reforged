import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { environment } from "../../../../../../../environments/environment";
import { PlayerStats } from "../../../../../../models/player-stats";

@Component({
  selector: 'app-match-stats-summary-for-players-of-team',
  templateUrl: './match-stats-summary-for-players-of-team.component.html',
  styleUrls: ['./match-stats-summary-for-players-of-team.component.scss']
})
export class MatchStatsSummaryForPlayersOfTeamComponent implements OnChanges {

  @Input()
  matchPlayersSummaryStatsForTeam: any;

  teamName = '';

  playersStats: PlayerStats[];

  displayedColumns: string[] = ['player', 'pts', 'pm2', 'pm3', 'ftm', 'offr', 'defr', 'ast', 'blkm', 'pf', 'eff'];
  dataSource: MatTableDataSource<PlayerStats>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  apiUrl = environment.api.url;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.matchPlayersSummaryStatsForTeam) {
      this.playersStats = this.matchPlayersSummaryStatsForTeam.playersStats;
      this.teamName = this.matchPlayersSummaryStatsForTeam.team.name;
      this.dataSource = new MatTableDataSource(this.playersStats);
      this.dataSource.sort = this.sort;
    }
  }

}
