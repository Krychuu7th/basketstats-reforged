import { UntypedFormGroup } from '@angular/forms';
import { TeamService } from 'src/app/components/team/team.service';

export function TeamNameNotUsed(controlName: string, teamService: TeamService, teamNameToEdit: string) {

  return (formGroup: UntypedFormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.nameAlreadyUsed) {
      return;
    }
    teamService.isTeamWithNameExisting(control.value).subscribe((res: any) => {
      if (control.value != teamNameToEdit && res) {
        control.setErrors({ nameAlreadyUsed: true });
      } else {
        control.setErrors(null);
      }
    });
  }
}
