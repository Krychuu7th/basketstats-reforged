import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { MatchStatus } from "../../../../enums/match-status.enum";
import { League } from "../../../../models/league";
import { Match } from "../../../../models/match";
import { User } from "../../../../models/user";
import { MatchService } from "../../../schedule/match.service";
import { UserService } from "../../user-list/user.service";
import { LinkUserConfirmComponent } from "../link-user-confirm/link-user-confirm.component";
import { MatchAddComponent } from "../match-add/match-add.component";
import { MatchDeleteConfirmComponent } from "../match-delete-confirm/match-delete-confirm.component";
import { MatchEditComponent } from "../match-edit/match-edit.component";

@Component({
  selector: 'app-match-administration-list',
  templateUrl: './match-administration-list.component.html',
  styleUrls: ['./match-administration-list.component.css']
})
export class MatchAdministrationListComponent implements OnChanges, OnInit {

  @Input()
  league: League;

  @Input()
  userList: User[];

  matchList: Match[];

  displayedColumns: string[] = ['teamA', 'teamB', 'matchDate', 'place', 'finished', 'user'];
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

  constructor(
    private userService: UserService,
    private matchService: MatchService,
    // private nbToastrService: NbToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.matchService.getMatchListByLeagueId(this.league.id).subscribe((res: Match[]) => {
      this.matchList = res;
      this.dataSubject.next(this.matchList.slice(this.lowIndex, this.highIndex));
      this.dataSource = new RecordsDataSource(this.dataSubject);
      this.dataSource.sort = this.sort;
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

  addMatch() {
    const modalRef = this.modalService.open(MatchAddComponent);
    modalRef.componentInstance.league = this.league;
    modalRef.componentInstance.userList = this.userList;
    modalRef.result.then( res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error =>{

    });
  }

  editMatch(match: Match) {
    const modalRef = this.modalService.open(MatchEditComponent);
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.league = this.league;
    modalRef.componentInstance.match = match;
    modalRef.result.then( res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error =>{

    });
  }

  deleteMatch(match: Match) {
    const modalRef = this.modalService.open(MatchDeleteConfirmComponent);
    modalRef.componentInstance.league = this.league;
    modalRef.componentInstance.match = match;
    modalRef.componentInstance.matchId = match.id;
    modalRef.result.then( res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error =>{

    });
  }

  linkUser(match: Match, event: MatSelectChange) {
    const user = this.userList.find(u => u.id == event.value);
    const modalRef = this.modalService.open(LinkUserConfirmComponent);
    modalRef.componentInstance.match = match;
    modalRef.componentInstance.user = user;
    modalRef.result.then( res => {
        this.emitLoadData.emit();
    }, error =>{

    });
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
