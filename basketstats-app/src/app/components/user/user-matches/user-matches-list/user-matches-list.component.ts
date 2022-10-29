import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { MatchStatus } from "../../../../enums/match-status.enum";
import { League } from "../../../../models/league";
import { Match } from "../../../../models/match";
import { User } from "../../../../models/user";
import { UserService } from "../../../administration/user-list/user.service";
import { MatchService } from "../../../schedule/match.service";

@Component({
  selector: 'app-user-matches-list',
  templateUrl: './user-matches-list.component.html',
  styleUrls: ['./user-matches-list.component.css']
})
export class UserMatchesListComponent implements OnInit {

  @Input()
  league: League;

  @Input()
  user: User;

  matchList: Match[];

  displayedColumns: string[] = ['teamA', 'teamB', 'matchDate', 'place', 'finished', 'options'];
  dataSource: MatTableDataSource<Match>;

  dataSubject = new BehaviorSubject<Match[]>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() emitLoadData = new EventEmitter();

  lowIndex: number = 0;
  highIndex: number = 8;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  apiUrl = environment.url;

  MatchStatus = MatchStatus;

  matchIsInProgress = false;

  constructor(
    private userService: UserService,
    private matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.matchService.getMatchListByLeagueIdForUser(this.league.id, this.user.id).subscribe((res: Match[]) => {
      this.matchList = res;
      this.dataSubject.next(this.matchList.slice(this.lowIndex, this.highIndex));
      this.dataSource = new RecordsDataSource(this.dataSubject);
      this.dataSource.sort = this.sort;
      if(localStorage.getItem('teamAStatsForMatchInProgress') != null) {
        this.matchIsInProgress = true;
      }

      this.matchList.forEach(m => {
        if(m.matchStatus != MatchStatus.DONE
          && m.matchStatus != MatchStatus.PLANNED
          && m.matchStatus != MatchStatus.SETTINGS) {
          this.matchIsInProgress = true;
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onSortData(sort: Sort) {
    let data = this.matchList.slice(this.lowIndex, this.highIndex);
    if (sort.active && sort.direction !== '') {
      data = data.sort((a: Match, b: Match) => {
        const isAsc = sort.direction === 'asc';
        const isDesc = sort.direction === 'desc';
        switch (sort.active) {
          case 'teamA': return this.compare(a.teamA.name, b.teamA.name, isAsc);
          case 'teamB': return this.compare(a.teamB.name, b.teamB.name, isAsc);
          case 'matchDate': return this.compareDate(a.matchDate, b.matchDate, isAsc);
          case 'place': return this.compare(a.place, b.place, isAsc);
          case 'finished': return this.compare(a.matchStatus, b.matchStatus, isDesc) && this.compareDate(a.matchDate, b.matchDate, isAsc);
          default: return 0;
        }
      });
    }
    this.dataSubject.next(data);
  }

  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public compareDate(date1: Date, date2: Date, isAsc): number
  {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    let same = d1.getTime() === d2.getTime();
    if (same) return 0;
    else if (d1 > d2) return 1  * (isAsc ? 1 : -1);
    else if (d1 < d2) return -1  * (isAsc ? 1 : -1);
  }

  pageChange(paginator: PageEvent) {
    this.lowIndex = (paginator.pageIndex * paginator.pageSize);
    this.highIndex = this.lowIndex + paginator.pageSize;
    this.dataSubject.next(this.matchList.slice(this.lowIndex, this.highIndex));
  }

  showToast(message: string, title: string, status, preventDuplicates, position, duration) {
    // this.nbToastrService.show(message, title,
    //   { status, preventDuplicates, position, duration });
  }

  onContextMenu(event: MouseEvent, row: Match) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'row': row };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  getMatchInProgressQuarter(match: Match) {
    if (match.matchStatus == MatchStatus.FIRST_QUARTER) {
      return 1;
    } else if (match.matchStatus == MatchStatus.SECOND_QUARTER) {
      return 2;
    } else if (match.matchStatus == MatchStatus.THIRD_QUARTER) {
      return 3;
    } else if (match.matchStatus == MatchStatus.FOURTH_QUARTER) {
      return 4;
    } else if (match.matchStatus == MatchStatus.OVERTIME) {
      return 5;
    }
  }

  getRouteLinkToMatch(match: Match) {
    if(match.matchStatus == MatchStatus.PLANNED) {
      return ['/match', 'settings', match.id];
    } else if(match.matchStatus != MatchStatus.DONE) {

      this.matchService.getStatsOfMatch(match.id).subscribe(res => {
        console.log(res);
        // if (match.matchStatus == MatchStatus.FIRST_QUARTER) {
        //   return `['/match', 'progress', match.id, 1]`;
        // } else if (match.matchStatus == MatchStatus.SECOND_QUARTER) {
        //   return `['/match', 'progress', match.id, 2]`;
        // } else if (match.matchStatus == MatchStatus.THIRD_QUARTER) {
        //   return `['/match', 'progress', match.id, 3]`;
        // } else if (match.matchStatus == MatchStatus.FOURTH_QUARTER) {
        //   return `['/match', 'progress', match.id, 4]`;
        // } else if (match.matchStatus == MatchStatus.OVERTIME) {
        //   return `['/match', 'progress', match.id, 5]`;
        // }
      });
    }
  }

}

export class RecordsDataSource extends MatTableDataSource<Match> {

  constructor(private subject: BehaviorSubject<Match[]>) {
    super();
  }

  connect(): BehaviorSubject<any[]> {
    return this.subject;
  }

  disconnect(): void {

  }
}
