import { Component, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TeamService } from "../../../team/team.service";

@Component({
  selector: 'app-team-delete-confirm',
  templateUrl: './team-delete-confirm.component.html',
  styleUrls: ['./team-delete-confirm.component.css']
})
export class TeamDeleteConfirmComponent {

  @Input() teamName: string;
  @Input() teamId: number;

  constructor(
    private teamService: TeamService,
    // private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal
  ) { }

  deleteUser() {
    this.teamService.delete(this.teamId).subscribe(
      res => {
        this.activeModal.close('confirm');
        this.showToast('Drużyna została usunięta',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
      error => {
        this.showToast('Drużyna nie została usunięta',
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
