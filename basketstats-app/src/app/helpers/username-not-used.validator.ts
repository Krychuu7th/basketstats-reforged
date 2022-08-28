import { FormGroup } from '@angular/forms';
import {UserService} from "../components/administration/user-list/user.service";

export function UsernameNotUsed(controlName: string, userService: UserService, usernameToEdit: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.usernameAlreadyUsed) {
      return;
    }
    userService.isUserWithUsernameExisting(control.value).subscribe(res =>{
      if ( control.value != usernameToEdit && res ) {
        control.setErrors({ usernameAlreadyUsed: true });
      } else {
        control.setErrors(null);
      }
    });
  }
}
