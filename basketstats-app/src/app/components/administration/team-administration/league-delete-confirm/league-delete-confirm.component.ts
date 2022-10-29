import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LeagueService } from "../../../league/league.service";

@Component({
  selector: 'app-league-delete-confirm',
  templateUrl: './league-delete-confirm.component.html',
  styleUrls: ['./league-delete-confirm.component.scss']
})
export class LeagueDeleteConfirmComponent implements OnInit {

  @Input() leagueName;
  @Input() leagueId;

  constructor(
    private leagueService: LeagueService,
    // private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteUser() {
    this.leagueService.deleteLeague(this.leagueId).subscribe(
      res => {
        this.showToast('Liga została usunięta',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
      error => {
        this.showToast('Liga nie została usunięta',
          'Coś poszło nie tak!',
          'danger',
          false,
          'bottom-end',
          6000);
      });
  }

  showToast(message: string, title: string, status, preventDuplicates, position, duration) {
    // this.nbToastrService.show(message, title,
    //   { status, preventDuplicates, position, duration });
  }

}
