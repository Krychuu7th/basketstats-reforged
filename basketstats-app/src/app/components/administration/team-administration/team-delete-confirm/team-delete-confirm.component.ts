import {Component, Input, OnInit} from '@angular/core';
import {NbToastrService} from "@nebular/theme";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TeamService} from "../../../team/team.service";

@Component({
  selector: 'app-team-delete-confirm',
  templateUrl: './team-delete-confirm.component.html',
  styleUrls: ['./team-delete-confirm.component.css']
})
export class TeamDeleteConfirmComponent implements OnInit {

  @Input() teamName;
  @Input() teamId;

  constructor(
    private teamService: TeamService,
    private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteUser() {
    this.teamService.deleteTeam(this.teamId).subscribe(
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

  showToast(message: string, title: string, status, preventDuplicates, position, duration) {
    this.nbToastrService.show(message, title,
      { status, preventDuplicates, position, duration });
  }
}
