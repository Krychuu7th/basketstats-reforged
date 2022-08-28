import {Component, Input, OnInit} from '@angular/core';
import {PlayerService} from "../../../team/team-players/player.service";
import {NbToastrService} from "@nebular/theme";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Match} from "../../../../models/match";
import {User} from "../../../../models/user";
import {MatchService} from "../../../schedule/match.service";

@Component({
  selector: 'app-link-user-confirm',
  templateUrl: './link-user-confirm.component.html',
  styleUrls: ['./link-user-confirm.component.css']
})
export class LinkUserConfirmComponent implements OnInit {

  @Input() match: Match;
  @Input() user: User;

  constructor(
    private matchService: MatchService,
    private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  getNewMatch() {
    const newMatch: Match = this.match;
    newMatch.user = this.user;
    return newMatch;
  }

  updateMatch() {
    this.matchService.updateMatch(this.getNewMatch()).subscribe(
      res => {
        this.activeModal.close('confirm');
        this.showToast('Statystyk został przyspisany do meczu',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
      error => {
        this.showToast(error.error.message,
          'Coś poszło nie tak!',
          'danger',
          false,
          'bottom-end',
          6000);
        this.activeModal.close('confirm');
      });
  }

  showToast(message: string, title: string, status, preventDuplicates, position, duration) {
    this.nbToastrService.show(message, title,
      { status, preventDuplicates, position, duration });
  }

}
