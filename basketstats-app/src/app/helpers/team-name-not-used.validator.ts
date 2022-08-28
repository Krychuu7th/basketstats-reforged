import { FormGroup } from '@angular/forms';
import {UserService} from "../components/administration/user-list/user.service";
import {TeamService} from "../components/team/team.service";

export function TeamNameNotUsed(controlName: string, teamService: TeamService, teamNameToEdit: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.nameAlreadyUsed) {
      return;
    }
    teamService.isTeamWithNameExisting(control.value).subscribe(res =>{
      if ( control.value != teamNameToEdit && res ) {
        control.setErrors({ nameAlreadyUsed: true });
      } else {
        control.setErrors(null);
      }
    });
  }
}
