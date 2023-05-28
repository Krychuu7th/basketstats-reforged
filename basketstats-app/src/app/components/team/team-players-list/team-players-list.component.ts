import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Player } from "../../../models/player";
import { Team } from "../../../models/team";
import { PlayerAddEditComponent } from "../../administration/player-administration/player-add-edit/player-add-edit.component";
import { PlayerDeleteConfirmComponent } from "../../administration/player-administration/player-delete-confirm/player-delete-confirm.component";

@Component({
  selector: 'app-team-players-list',
  templateUrl: './team-players-list.component.html',
  styleUrls: ['./team-players-list.component.scss']
})
export class TeamPlayersListComponent implements OnChanges {


  @Input()
  team: Team;

  @Input()
  teamPlayers: Player[];

  displayedColumns: string[] = ['number', 'firstName', 'lastName', 'position', 'captain'];
  dataSource: MatTableDataSource<Player>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  @Output() emitLoadData = new EventEmitter<void>();

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.teamPlayers);
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

  addPlayer() {
    const modalRef = this.modalService.open(PlayerAddEditComponent);
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.team = this.team;
    modalRef.result.then(res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error => {

    });
  }

  editPlayer(player: Player) {
    const modalRef = this.modalService.open(PlayerAddEditComponent);
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.player = player;
    modalRef.componentInstance.team = this.team;
    modalRef.result.then(res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error => {

    });
  }

  deletePlayer(player: Player, playerId: number) {
    const modalRef = this.modalService.open(PlayerDeleteConfirmComponent);
    modalRef.componentInstance.player = player;
    modalRef.componentInstance.playerId = playerId;
    modalRef.result.then(res => {
      if (res == 'confirm') {
        this.emitLoadData.emit();
      }
    }, error => {

    });
  }

  onContextMenu(event: MouseEvent, row: Player) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'row': row };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }


}
