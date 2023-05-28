import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Position } from "../../../../enums/position.enum";
import { Player } from "../../../../models/player";
import { Team } from "../../../../models/team";
import { PlayerService } from "../../../team/team-players/player.service";

@Component({
  selector: 'app-player-add-edit',
  templateUrl: './player-add-edit.component.html',
  styleUrls: ['./player-add-edit.component.css']
})
export class PlayerAddEditComponent implements OnInit {

  submited = false;

  @Input()
  isEdit = false;
  @Input()
  player: Player;
  @Input()
  team: Team;

  formGroup: UntypedFormGroup;

  positions = Object.values(Position);

  constructor(
    private playerService: PlayerService,
    // private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    console.log(this.player);
    this.formGroup = new UntypedFormGroup({
      firstName: new UntypedFormControl(this.player ? this.player.firstName : null,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\-]*')
        ]
      ),
      lastName: new UntypedFormControl(this.player ? this.player.lastName : null,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\-]*')
        ]
      ),
      number: new UntypedFormControl(this.player ? this.player.number : null,
        [
          Validators.required,
          Validators.max(99)
        ]
      ),
      position: new UntypedFormControl(this.player ? this.player.position : null,
        [
          Validators.required
        ]
      ),
    });

  }

  get form() {
    return this.formGroup.controls;
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
      this.addPlayer();
    }
    else {
      this.editPlayer();
    }
  }

  getNewPlayer() {
    let newPlayer = new Player();
    newPlayer.firstName = this.form.firstName.value;
    newPlayer.lastName = this.form.lastName.value;
    newPlayer.number = this.form.number.value;
    newPlayer.position = this.form.position.value;
    newPlayer.team = this.team;
    return newPlayer;
  }

  addPlayer() {
    this.markFormGroupTouched(this.formGroup);
    if (!this.formGroup.invalid) {
      this.playerService.createPlayer(this.getNewPlayer()).subscribe(res => {
        this.activeModal.close('confirm');
        this.showToast('Zawodnik został dodany',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
        error => {
          this.showToast('Zawodnik nie został dodany',
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

  editPlayer() {
    this.markFormGroupTouched(this.formGroup);
    if (!this.formGroup.invalid) {
      this.playerService.updatePlayer(this.player.id, this.getNewPlayer()).subscribe(res => {
        this.activeModal.close('confirm');
        this.showToast('Zawodnik został zaktualizowany',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
        error => {
          this.showToast('Zawodnik nie został zaktualizowany',
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
