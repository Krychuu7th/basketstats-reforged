import { UntypedFormGroup } from '@angular/forms';
import { UserService } from 'src/app/components/administration/user-list/user.service';

export function UsernameNotUsed(controlName: string, userService: UserService, usernameToEdit: string) {

  return (formGroup: UntypedFormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.usernameAlreadyUsed) {
      return;
    }
    userService.isUserWithUsernameExisting(control.value).subscribe((res: any) => {
      if (control.value != usernameToEdit && res) {
        control.setErrors({ usernameAlreadyUsed: true });
      } else {
        control.setErrors(null);
      }
    });
  }
}
