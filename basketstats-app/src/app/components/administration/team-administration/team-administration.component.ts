import {Component, OnInit, ViewChild} from '@angular/core';
import {League} from "../../../models/league";
import {Team} from "../../../models/team";
import {TeamService} from "../../team/team.service";
import {LeagueService} from "../../league/league.service";
import {delay, first} from "rxjs/operators";
import {User} from "../../../models/user";
import {MatMenuTrigger} from "@angular/material/menu";
import {UserAddEditComponent} from "../user-add-edit/user-add-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LeagueAddEditComponent} from "./league-add-edit/league-add-edit.component";
import {UserDeleteConfirmComponent} from "../user-delete-confirm/user-delete-confirm.component";
import {LeagueDeleteConfirmComponent} from "./league-delete-confirm/league-delete-confirm.component";

@Component({
  selector: 'app-team-administration',
  templateUrl: './team-administration.component.html',
  styleUrls: ['./team-administration.component.scss']
})
export class TeamAdministrationComponent implements OnInit {

  leagueList: League[];
  teamList: Team[];

  isLoading = false;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadLeagues();
    this.teamService.getTeamList().pipe(delay(100)).subscribe(data => {
      this.teamList = data;
      this.isLoading = false;
    });
  }

  loadLeagues() {
    this.isLoading = true;
    this.leagueService.getLeagueList().pipe(delay(100)).subscribe(data => {
      this.leagueList = data;
    });
  }

  getTeamsOfLeague(leagueId: number) {
    return this.teamList? this.teamList.filter(obj => obj.league.id == leagueId): null;
  }

  addLeague() {
    const modalRef = this.modalService.open(LeagueAddEditComponent);
    modalRef.componentInstance.isEdit = false;
    modalRef.result.then( res => {
      if (res == 'confirm') {
        this.loadData();
      }
    }, error =>{

    });
  }

  editLeague(league: League) {
    const modalRef = this.modalService.open(LeagueAddEditComponent);
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.league = league;
    modalRef.result.then( res => {
      if (res == 'confirm') {
        this.loadData();
      }
    }, error =>{

    });
  }

  deleteLeague(leagueName: string, leagueId: number) {
    const modalRef = this.modalService.open(LeagueDeleteConfirmComponent);
    modalRef.componentInstance.leagueName = leagueName;
    modalRef.componentInstance.leagueId = leagueId;
    modalRef.result.then( res => {
      if (res == 'confirm') {
        this.loadData();
        this.loadData();
      }
    }, error =>{

    });
  }

  onContextMenu(event: MouseEvent, league: League) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'league': league };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
