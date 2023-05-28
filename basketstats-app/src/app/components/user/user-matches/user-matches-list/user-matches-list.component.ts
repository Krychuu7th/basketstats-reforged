import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { MatchStatus } from "../../../../enums/match-status.enum";
import { League } from "../../../../models/league.model";
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

  apiUrl = environment.api.url;

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
      if (localStorage.getItem('teamAStatsForMatchInProgress') != null) {
        this.matchIsInProgress = true;
      }

      this.matchList.forEach(m => {
        if (m.matchStatus != MatchStatus.DONE
          && m.matchStatus != MatchStatus.PLANNED
          && m.matchStatus != MatchStatus.SETTINGS) {
          this.matchIsInProgress = true;
        }
      });
    });
  }

  pageChange(paginator: PageEvent) {
    this.lowIndex = (paginator.pageIndex * paginator.pageSize);
    this.highIndex = this.lowIndex + paginator.pageSize;
    this.dataSubject.next(this.matchList.slice(this.lowIndex, this.highIndex));
  }

  // showToast(message: string, title: string, status: string, preventDuplicates: boolean, position: string, duration: number) {
  // this.nbToastrService.show(message, title,
  //   { status, preventDuplicates, position, duration });
  // }

  // onContextMenu(event: MouseEvent, row: Match) {
  //   event.preventDefault();
  //   this.contextMenuPosition.x = event.clientX + 'px';
  //   this.contextMenuPosition.y = event.clientY + 'px';
  //   this.contextMenu.menuData = { 'row': row };
  //   this.contextMenu.menu.focusFirstItem('mouse');
  //   this.contextMenu.openMenu();
  // }

  getMatchInProgressQuarter(match: Match): number {
    if (match.matchStatus == MatchStatus.FIRST_QUARTER) {
      return 1;
    }
    if (match.matchStatus == MatchStatus.SECOND_QUARTER) {
      return 2;
    } if (match.matchStatus == MatchStatus.THIRD_QUARTER) {
      return 3;
    }
    if (match.matchStatus == MatchStatus.FOURTH_QUARTER) {
      return 4;
    }
    if (match.matchStatus == MatchStatus.OVERTIME) {
      return 5;
    }
    throw (`Wrong match status. Got ${match.matchStatus}, expected: FIRST_QUARTER, SECOND_QUARTER, THIRD_QUARTER, FOURTH_QUARTER, OVERTIME`);
  }

  getRouteLinkToMatch(match: Match): string[] {
    if (match.matchStatus == MatchStatus.PLANNED) {
      return ['/match', 'settings', match.id.toString()];
    }
    if (match.matchStatus != MatchStatus.DONE) {
      if (match.matchStatus == MatchStatus.FIRST_QUARTER) {
        return ['/match', 'progress', match.id.toString(), '1'];
      }
      if (match.matchStatus == MatchStatus.SECOND_QUARTER) {
        return ['/match', 'progress', match.id.toString(), '2'];
      }
      if (match.matchStatus == MatchStatus.THIRD_QUARTER) {
        return ['/match', 'progress', match.id.toString(), '3'];
      }
      if (match.matchStatus == MatchStatus.FOURTH_QUARTER) {
        return ['/match', 'progress', match.id.toString(), '4'];
      }
      if (match.matchStatus == MatchStatus.OVERTIME) {
        return ['/match', 'progress', match.id.toString(), '5'];
      }
    }
    throw (`Wrong match status. Got ${match.matchStatus}, expected: DONE, PLANNED`);
  }

  onSortData(event: any): void {

  }

}

export class RecordsDataSource extends MatTableDataSource<Match> {

  constructor(private subject: BehaviorSubject<Match[]>) {
    super();
  }

  override connect(): BehaviorSubject<any[]> {
    return this.subject;
  }
}
