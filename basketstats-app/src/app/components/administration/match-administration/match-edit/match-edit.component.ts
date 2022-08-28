import {Component, Input, OnInit} from '@angular/core';
import {League} from "../../../../models/league";
import {User} from "../../../../models/user";
import {Team} from "../../../../models/team";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Position} from "../../../../enums/position.enum";
import {MatchService} from "../../../schedule/match.service";
import {TeamService} from "../../../team/team.service";
import {NbToastrService} from "@nebular/theme";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Match} from "../../../../models/match";

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {

  submited = false;

  @Input()
  match: Match;

  formGroup: FormGroup;

  matchDatetime: Date = new Date();

  positions = Object.values(Position);

  constructor(
    private matchService: MatchService,
    private teamService: TeamService,
    private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      matchDate: new FormControl(this.match ? new Date(this.match.matchDate) : new Date(),
        [
          Validators.required
        ]
      ),
      place: new FormControl(this.match ? this.match.place : null,
        [
          Validators.required
        ]
      )
    });
  }

  get form() {
    return this.formGroup.controls;
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
    this.editMatch();
  }

  getEditedMatch() {
    const newMatch = new Match();
    newMatch.id = this.match.id;
    newMatch.teamA = this.match.teamA;
    newMatch.teamB = this.match.teamB;
    newMatch.matchDate = this.form.matchDate.value;
    newMatch.matchDate.setHours(this.form.matchDate.value.getHours()+1);
    newMatch.place = this.form.place.value;
    newMatch.user = this.match.user;
    return newMatch;
  }

  editMatch() {
    this.markFormGroupTouched(this.formGroup);
    if(!this.formGroup.invalid) {
      this.matchService.updateMatch(this.getEditedMatch()).subscribe(res => {
          this.activeModal.close('confirm');
          this.showToast('Mecz został zaktualizowany',
            'Udało się!',
            'success',
            false,
            'bottom-end',
            6000);
        },
        error => {
          this.showToast('Mecz nie został zaktualizowany',
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
