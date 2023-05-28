import { HttpResponse } from "@angular/common/http";
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TeamNameNotUsed } from "src/app/helpers/validators/team-name-not-used.validator";
import { League } from "../../../../models/league.model";
import { Team } from "../../../../models/team";
import { LeagueService } from "../../../league/league.service";
import { TeamService } from "../../../team/team.service";

@Component({
  selector: 'app-team-add-edit',
  templateUrl: './team-add-edit.component.html',
  styleUrls: ['./team-add-edit.component.css']
})
export class TeamAddEditComponent implements OnInit {

  submited = false;

  @Input()
  isEdit = false;
  @Input()
  team: Team;
  @Input()
  league: League;
  formGroup: UntypedFormGroup;

  leagueList: League[];
  leagueName = '';

  selectedLogoFile: File | undefined = new File([""], "nologo");
  maxFileSize = 4096000;

  constructor(
    public activeModal: NgbActiveModal,
    // private nbToastrService: NbToastrService,
    private teamService: TeamService,
    private leagueService: LeagueService,
    private formBuilder: UntypedFormBuilder
  ) {
  }

  ngOnInit(): void {
    this.loadData();
    this.initForm();
  }

  loadData() {
    this.leagueService.getAll().subscribe(res => {
      this.leagueList = res;
    });
  }

  get form() {
    return this.formGroup.controls;
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      name: new UntypedFormControl(this.team ? this.team.name : null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern('[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\\s\\-]*')
        ]
      ),
      league: new UntypedFormControl(this.team ? this.team.league.name : null,
        [
          this.isEdit ? Validators.required : Validators.nullValidator
        ]
      ),
      logo: new UntypedFormControl(null
      ),
    }, {
      validators: [
        TeamNameNotUsed('name', this.teamService, this.team?.name ?? null),
      ]
    });
  }

  markFormGroupTouched(formGroup: UntypedFormGroup) {
    (<any>Object).values(this.form).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  submit() {
    if (!this.isEdit) {
      this.addTeam();
    } else {
      this.editTeam();
    }
  }

  getNewTeam(logoFile: File) {
    let newTeam = new Team();
    newTeam.name = this.form.name.value;

    newTeam.league = !this.isEdit ? this.league : this.leagueList.find(l => l.name == this.form.league.value)!;
    newTeam.logoFile = logoFile;
    newTeam.logo = this.selectedLogoFile?.name!;
    return newTeam;
  }

  addTeam() {
    this.markFormGroupTouched(this.formGroup);
    if (!this.formGroup.invalid) {
      this.teamService.createTeam(this.getNewTeam(this.selectedLogoFile!)).subscribe(event => {
        if (event instanceof HttpResponse) {

          this.activeModal.close('confirm');
          this.showToast('Drużyna została dodana',
            'Udało się!',
            'success',
            false,
            'bottom-end',
            6000);
        }
      },
        error => {
          console.log(error);
          this.selectedLogoFile = new File([""], "nologo");
          this.form.logo.setValue(null);
          this.showToast('Drużyna nie została dodana',
            'Coś poszło nie tak!',
            'danger',
            false,
            'bottom-end',
            6000);
        });
      this.selectedLogoFile = undefined;
    } else {
      this.showToast('Popraw wprowadzone dane',
        'Błędy w formularzu!',
        'warning',
        false,
        'bottom-end',
        6000);
    }
  }

  editTeam() {
    this.markFormGroupTouched(this.formGroup);
    if (!this.formGroup.invalid) {
      this.teamService.updateTeam(this.team.id, this.getNewTeam(this.selectedLogoFile!)).subscribe(event => {
        if (event instanceof HttpResponse) {

          this.activeModal.close('confirm');
          this.showToast('Drużyna została zaktualizowana',
            'Udało się!',
            'success',
            false,
            'bottom-end',
            6000);
        }
      },
        error => {
          this.selectedLogoFile = new File([""], "nologo");
          this.form.logo.setValue(null);
          this.showToast('Drużyna nie została zaktualizowana',
            'Coś poszło nie tak!',
            'danger',
            false,
            'bottom-end',
            6000);
        });
    } else {
      this.showToast('Popraw wprowadzone dane',
        'Błędy w formularzu!',
        'warning',
        false,
        'bottom-end',
        6000);
    }
  }

  showToast(message: string, title: string, status: string, preventDuplicates: boolean, position: string, duration: number) {
    // this.nbToastrService.show(message, title,
    //   {status, preventDuplicates, position, duration});
  }

  onFileSelected(event: any) {
    this.selectedLogoFile = event.target.files[0];
    if (this.selectedLogoFile?.size! > this.maxFileSize) {
      this.form.logo.setErrors({ fileSizeError: true });
    }
  }

}
