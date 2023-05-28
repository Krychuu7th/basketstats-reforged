import { Component, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../user-list/user.service";

@Component({
  selector: 'app-user-delete-confirm',
  templateUrl: './user-delete-confirm.component.html',
  styleUrls: ['./user-delete-confirm.component.scss']
})
export class UserDeleteConfirmComponent {

  @Input() username: string;
  @Input() userId: number;

  constructor(
    private userService: UserService,
    // private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal
  ) { }
  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe(
      res => {
        this.showToast('Użytkownik został usunięty',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
      error => {
        this.showToast('Użytkownik nie został usunięty',
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
