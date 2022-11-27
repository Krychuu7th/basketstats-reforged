import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from "@angular/material/menu";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "../../../../environments/environment";
import { League } from "../../../models/league";
import { Team } from "../../../models/team";
import { TeamAddEditComponent } from "../../administration/team-administration/team-add-edit/team-add-edit.component";
import { TeamDeleteConfirmComponent } from "../../administration/team-administration/team-delete-confirm/team-delete-confirm.component";
import { LeagueService } from "../../league/league.service";
import { TeamService } from "../team.service";

@Component({
  selector: 'app-team-card-list',
  templateUrl: './team-card-list.component.html',
  styleUrls: ['./team-card-list.component.scss']
})
export class TeamCardListComponent implements OnChanges {

  @Input()
  teamList: Team[];

  @Input()
  league: League;

  @Input()
  adminView = false;

  lowIndex = 0;
  highIndex = 6;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  @Output() emitLoadData = new EventEmitter<void>();

  apiUrl = environment.api.url;

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute
  ) {
    if(this.activatedRoute.snapshot.data['adminViewType'] == 'TEAMS') {
      this.adminView = true;
      this.highIndex = 12;
    }
  }

  ngOnChanges(): void {
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowIndex = (event.pageIndex * event.pageSize);
    this.highIndex = this.lowIndex + event.pageSize;
    return event;
  }

  addTeam() {
    const modalRef = this.modalService.open(TeamAddEditComponent);
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.league = this.league;
    modalRef.result.then( res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error =>{

    });
  }

  editTeam( team: Team ) {
    const modalRef = this.modalService.open(TeamAddEditComponent);
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.team = team;
    modalRef.result.then( res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error =>{

    });
  }

  deleteTeam( teamName: string, teamId: number ) {
    const modalRef = this.modalService.open(TeamDeleteConfirmComponent);
    modalRef.componentInstance.teamName = teamName;
    modalRef.componentInstance.teamId = teamId;
    modalRef.result.then( res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error =>{

    });
  }

  onContextMenu(event: MouseEvent, team: Team) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'team': team };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

}
