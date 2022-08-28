import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../user-list/user.service";
import {NbToastrService} from "@nebular/theme";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PlayerService} from "../../../team/team-players/player.service";
import {Player} from "../../../../models/player";

@Component({
  selector: 'app-player-delete-confirm',
  templateUrl: './player-delete-confirm.component.html',
  styleUrls: ['./player-delete-confirm.component.css']
})
export class PlayerDeleteConfirmComponent implements OnInit {

  @Input() player: Player;
  @Input() playerId;

  constructor(
    private playerService: PlayerService,
    private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteUser() {
    this.playerService.deletePlayer(this.playerId).subscribe(
      res => {
        this.showToast('Zawodnik został usunięty',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
      error => {
        this.showToast('Zawodnik nie został usunięty',
          'Coś poszło nie tak!',
          'danger',
          false,
          'bottom-end',
          6000);
      });
  }

  showToast(message: string, title: string, status, preventDuplicates, position, duration) {
    this.nbToastrService.show(message, title,
      { status, preventDuplicates, position, duration });
  }

}
