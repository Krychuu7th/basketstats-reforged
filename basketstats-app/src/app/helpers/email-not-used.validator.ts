import { FormGroup } from '@angular/forms';
import {UserService} from "../components/administration/user-list/user.service";

export function EmailNotUsed(controlName: string, userService: UserService, emailToEdit: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.emailAlreadyUsed) {
      return;
    }
    userService.isUserWithEmailExisting(control.value).subscribe(res =>{
      if ( control.value != emailToEdit && res ) {
        control.setErrors({ emailAlreadyUsed: true });
      } else {
        control.setErrors(null);
      }
    });
  }
}
