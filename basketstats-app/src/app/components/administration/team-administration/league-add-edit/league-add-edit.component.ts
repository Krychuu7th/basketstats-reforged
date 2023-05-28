import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LeagueNameNotUsed } from 'src/app/helpers/validators/league-name-not-used.validator';
import { League } from "../../../../models/league.model";
import { LeagueService } from "../../../league/league.service";

@Component({
  selector: 'app-league-add-edit',
  templateUrl: './league-add-edit.component.html',
  styleUrls: ['./league-add-edit.component.scss']
})
export class LeagueAddEditComponent implements OnInit {

  submited = false;

  @Input()
  isEdit = false;
  @Input()
  league: League;
  formGroup: UntypedFormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    // private nbToastrService: NbToastrService,
    private leagueService: LeagueService,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  get form() {
    return this.formGroup.controls;
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      name: new UntypedFormControl(this.league ? this.league.name : null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\\s\\-]*')
        ]
      )
    }, {
      validators: [
        LeagueNameNotUsed('name', this.leagueService, this.league?.name ?? null),
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
      this.addLeague();
    }
    else {
      this.editLeague();
    }
  }

  getNewLeague() {
    let newLeague = new League();
    newLeague.name = this.form.name.value;
    return newLeague;
  }

  addLeague() {
    this.markFormGroupTouched(this.formGroup);
    if (!this.formGroup.invalid) {
      this.leagueService.create(this.getNewLeague()).subscribe(res => {
        this.activeModal.close('confirm');
        this.showToast('Użytkownik został dodany',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
        error => {
          this.showToast('Liga nie został dodany',
            'Coś poszło nie tak!',
            'danger',
            false,
            'bottom-end',
            6000);
        });
    }
    else {
      this.showToast('Popraw wprowadzone dane',
        'Błędy w formularzu!',
        'warning',
        false,
        'bottom-end',
        6000);
    }
  }

  editLeague() {
    this.markFormGroupTouched(this.formGroup);
    if (!this.formGroup.invalid) {
      const league = this.getNewLeague();
      league.id = this.league.id;
      this.leagueService.update(league).subscribe(res => {
        this.activeModal.close('confirm');
        this.showToast('Liga została zaktualizowana',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
        error => {
          this.showToast('Liga nie została zaktualizowana',
            'Coś poszło nie tak!',
            'danger',
            false,
            'bottom-end',
            6000);
        });
    }
    else {
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
    //   { status, preventDuplicates, position, duration });
  }

}
