import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {TeamService} from "../team.service";
import {Team} from "../../../models/team";
import {Player} from "../../../models/player";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-team-players-avg-stats-list',
  templateUrl: './team-players-avg-stats-list.component.html',
  styleUrls: ['./team-players-avg-stats-list.component.scss']
})
export class TeamPlayersAvgStatsListComponent implements OnChanges {

  @Input()
  team: Team;

  @Input()
  teamPlayers: Player[];

  @Input()
  teamPlayersAvgStats: any[];

  displayedColumns: string[] = ['player', 'ptsa', 'pm2a', 'pm3a', 'ftma', 'offra', 'defra', 'asta', 'blkma', 'pfa'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.teamPlayersAvgStats);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.pageSize = this.dataSource.data.length;
      this.dataSource.paginator.firstPage();
    }
  }
}
