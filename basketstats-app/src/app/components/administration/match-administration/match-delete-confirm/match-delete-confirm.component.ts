import { Component, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Match } from 'src/app/models/match';
import { MatchService } from "../../../schedule/match.service";

@Component({
  selector: 'app-match-delete-confirm',
  templateUrl: './match-delete-confirm.component.html',
  styleUrls: ['./match-delete-confirm.component.css']
})
export class MatchDeleteConfirmComponent {

  @Input() match: Match;
  @Input() matchId: number;

  constructor(
    private matchService: MatchService,
    // private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal
  ) { }

  deleteUser() {
    this.matchService.deleteMatch(this.matchId).subscribe(
      res => {
        this.showToast('Mecz został usunięty',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
      error => {
        this.showToast('Mecz nie został usunięty',
          'Coś poszło nie tak!',
          'danger',
          false,
          'bottom-end',
          6000);
      });
  }

  showToast(message: string, title: string, status: string, preventDuplicates: boolean, position: string, duration: number) {
    // this.nbToastrService.show(message, title,
    //   { status, preventDuplicates, position, duration });
  }

}
