import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../../../models/role";
import {UserService} from "../../user-list/user.service";
import {RoleService} from "../../../auth/role.service";
import {NbToastrService} from "@nebular/theme";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MustMatch} from "../../../../helpers/must-match.validator";
import {Player} from "../../../../models/player";
import {PlayerService} from "../../../team/team-players/player.service";
import {Position} from "../../../../enums/position.enum";
import {Team} from "../../../../models/team";

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

  formGroup: FormGroup;

  positions = Object.values(Position);

  constructor(
    private playerService: PlayerService,
    private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    console.log(this.player);
    this.formGroup = new FormGroup({
      firstName: new FormControl(this.player ? this.player.firstName : null,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\-]*')
        ]
      ),
      lastName: new FormControl(this.player ? this.player.lastName : null,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\-]*')
        ]
      ),
      number: new FormControl(this.player ? this.player.number : null,
        [
          Validators.required,
          Validators.max(99)
        ]
      ),
      position: new FormControl(this.player ? this.player.position : null,
        [
          Validators.required
        ]
      ),
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
    if(!this.isEdit) {
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
    if(!this.formGroup.invalid) {
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
    if(!this.formGroup.invalid) {
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

  showToast(message: string, title: string, status, preventDuplicates, position, duration) {
    this.nbToastrService.show(message, title,
      { status, preventDuplicates, position, duration });
  }

}
