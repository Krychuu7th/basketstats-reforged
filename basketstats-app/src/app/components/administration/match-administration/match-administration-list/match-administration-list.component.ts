import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { MatchStatus } from "../../../../enums/match-status.enum";
import { League } from "../../../../models/league.model";
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
export class MatchAdministrationListComponent implements OnInit {

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

  pageChange(paginator: PageEvent) {
    this.lowIndex = (paginator.pageIndex * paginator.pageSize);
    this.highIndex = this.lowIndex + paginator.pageSize;
    this.dataSubject.next(this.matchList.slice(this.lowIndex, this.highIndex));
  }

  addMatch() {
    const modalRef = this.modalService.open(MatchAddComponent);
    modalRef.componentInstance.league = this.league;
    modalRef.componentInstance.userList = this.userList;
    modalRef.result.then(res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error => {

    });
  }

  editMatch(match: Match) {
    const modalRef = this.modalService.open(MatchEditComponent);
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.league = this.league;
    modalRef.componentInstance.match = match;
    modalRef.result.then(res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error => {

    });
  }

  deleteMatch(match: Match) {
    const modalRef = this.modalService.open(MatchDeleteConfirmComponent);
    modalRef.componentInstance.league = this.league;
    modalRef.componentInstance.match = match;
    modalRef.componentInstance.matchId = match.id;
    modalRef.result.then(res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error => {

    });
  }

  linkUser(match: Match, event: MatSelectChange) {
    const user = this.userList.find(u => u.id == event.value);
    const modalRef = this.modalService.open(LinkUserConfirmComponent);
    modalRef.componentInstance.match = match;
    modalRef.componentInstance.user = user;
    modalRef.result.then(res => {
      this.emitLoadData.emit();
    }, error => {

    });
  }

  showToast(message: string, title: string, status: string, preventDuplicates: boolean, position: string, duration: number) {
    // this.nbToastrService.show(message, title,
    //   { status, preventDuplicates, position, duration });
  }

  onContextMenu(event: MouseEvent, row: Match) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'row': row };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onSortData(event: any) {

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
