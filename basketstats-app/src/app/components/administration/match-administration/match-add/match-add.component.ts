import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MatchStatus } from "../../../../enums/match-status.enum";
import { Position } from "../../../../enums/position.enum";
import { League } from "../../../../models/league";
import { Match } from "../../../../models/match";
import { Team } from "../../../../models/team";
import { User } from "../../../../models/user";
import { MatchService } from "../../../schedule/match.service";
import { TeamService } from "../../../team/team.service";

@Component({
  selector: 'app-match-add',
  templateUrl: './match-add.component.html',
  styleUrls: ['./match-add.component.css']
})
export class MatchAddComponent implements OnInit {

  submited = false;

  @Input()
  league: League;

  @Input()
  userList: User[];

  teamList: Team[];
  teamAList: Team[];
  teamBList: Team[];

  formGroup: UntypedFormGroup;

  positions = Object.values(Position);

  constructor(
    private matchService: MatchService,
    private teamService: TeamService,
    // private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loadTeams();
    this.initForm();
  }

  loadTeams() {
    this.teamService.getTeamByLeagueId(this.league.id).subscribe(res => {
      this.teamList = res;
      this.teamAList = res;
      this.teamBList = res;
    });
  }

  setTeamAList(event: Team) {
    this.teamAList = this.teamList.filter(t => t.id != event.id);
  }

  setTeamBList(event: Team) {
    this.teamBList = this.teamList.filter(t => t.id != event.id);
  }


  initForm() {
    this.formGroup = new UntypedFormGroup({
      teamA: new UntypedFormControl(null,
        [
          Validators.required
        ]
      ),
      teamB: new UntypedFormControl(null,
        [
          Validators.required
        ]
      ),
      matchDate: new UntypedFormControl(null,
        [
          Validators.required
        ]
      ),
      place: new UntypedFormControl(null,
        [
          Validators.required
        ]
      ),
      user: new UntypedFormControl(null,
      ),
    });

  }

  get form() {
    return this.formGroup.controls;
  }

  markFormGroupTouched(formGroup: UntypedFormGroup) {
    (<any>Object).values(this.form).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  submit() {
    this.addMatch();
  }

  getNewMatch() {
    const newMatch = new Match();
    newMatch.teamA = this.form.teamA.value;
    newMatch.teamB = this.form.teamB.value;
    newMatch.matchDate = this.form.matchDate.value;
    newMatch.place = this.form.place.value;
    newMatch.user = this.form.user.value;
    newMatch.matchStatus = MatchStatus.PLANNED;
    return newMatch;
  }

  addMatch() {
    this.markFormGroupTouched(this.formGroup);
    console.log(this.getNewMatch());
    if(!this.formGroup.invalid) {
      this.matchService.createMatch(this.getNewMatch()).subscribe(res => {
          this.activeModal.close('confirm');
          this.showToast('Mecz został dodany',
            'Udało się!',
            'success',
            false,
            'bottom-end',
            6000);
        },
        error => {
          this.showToast('Mecz nie został dodany',
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
    // this.nbToastrService.show(message, title,
    //   { status, preventDuplicates, position, duration });
  }

}
