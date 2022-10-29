import { UntypedFormGroup } from '@angular/forms';
import {UserService} from "../components/administration/user-list/user.service";
import {TeamService} from "../components/team/team.service";
import {LeagueService} from "../components/league/league.service";

export function LeagueNameNotUsed(controlName: string, leagueService: LeagueService, leagueNameToEdit: string) {

  return (formGroup: UntypedFormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.nameAlreadyUsed) {
      return;
    }
    leagueService.isLeagueWithNameExisting(control.value).subscribe(res =>{
      if ( control.value != leagueNameToEdit && res ) {
        control.setErrors({ nameAlreadyUsed: true });
      } else {
        control.setErrors(null);
      }
    });
  }
}
