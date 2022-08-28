import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {League} from "../../../../models/league";
import {MustMatch} from "../../../../helpers/must-match.validator";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NbToastrService} from "@nebular/theme";
import {LeagueService} from "../../../league/league.service";
import {UsernameNotUsed} from "../../../../helpers/username-not-used.validator";
import {EmailNotUsed} from "../../../../helpers/email-not-used.validator";
import {LeagueNameNotUsed} from "../../../../helpers/league-name-not-used.validator";

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
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private nbToastrService: NbToastrService,
    private leagueService: LeagueService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get form() {
    return this.formGroup.controls;
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(this.league ? this.league.name : null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\\s\\-]*')
        ]
      )
    }, { validators: [
        LeagueNameNotUsed('name', this.leagueService, this.league ? this.league.name : null),
      ]
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(this.form).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  submit() {
    if(!this.isEdit) {
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
    if(!this.formGroup.invalid) {
      this.leagueService.createLeague(this.getNewLeague()).subscribe(res => {
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
    if(!this.formGroup.invalid) {
      this.leagueService.updateLeague(this.league.id, this.getNewLeague()).subscribe(res => {
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

  showToast(message: string, title: string, status, preventDuplicates, position, duration) {
    this.nbToastrService.show(message, title,
      { status, preventDuplicates, position, duration });
  }

}
