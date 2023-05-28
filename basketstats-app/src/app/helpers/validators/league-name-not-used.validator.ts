import { UntypedFormGroup } from '@angular/forms';
import { LeagueService } from 'src/app/components/league/league.service';

export function LeagueNameNotUsed(controlName: string, leagueService: LeagueService, leagueNameToEdit: string) {

  return (formGroup: UntypedFormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.nameAlreadyUsed) {
      return;
    }
    leagueService.isLeagueWithNameExisting(control.value).subscribe((res: any) => {
      if (control.value != leagueNameToEdit && res) {
        control.setErrors({ nameAlreadyUsed: true });
      } else {
        control.setErrors(null);
      }
    });
  }
}
