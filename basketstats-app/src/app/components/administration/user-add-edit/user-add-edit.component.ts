import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MustMatch } from 'src/app/helpers/validators/must-match.validator';
import { UsernameNotUsed } from 'src/app/helpers/validators/username-not-used.validator';
import { UserRoles } from "../../../enums/user-roles";
import { EmailNotUsed } from "../../../helpers/validators/email-not-used.validator";
import { Role } from "../../../models/role";
import { User } from "../../../models/user";
import { RoleService } from "../../auth/role.service";
import { UserService } from "../user-list/user.service";

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  showPassword = false;
  submited = false;

  @Input()
  isEdit = false;
  changePassword = false;
  @Input()
  user: User;
  formGroup: UntypedFormGroup;

  selectedRoles: Role[] = [];
  roles: Role[];

  userRoles = UserRoles

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    // private nbToastrService: NbToastrService,
    public activeModal: NgbActiveModal,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.initForm();
  }

  loadData() {
    this.roleService.getRoleList().subscribe(res => {
      this.roles = res;
    });
  }

  initForm() {
    if (!this.isEdit) {
      this.changePassword = true;
    }
    this.formGroup = this.formBuilder.group({
      username: new UntypedFormControl(this.user ? this.user.username : null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
          Validators.pattern('^[A-Za-z0-9_-]*$')
        ]
      ),
      password: new UntypedFormControl('',
      ),
      passwordConfirm: new UntypedFormControl('',
      ),
      firstName: new UntypedFormControl(this.user ? this.user.firstName : null,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\-]*')
        ]
      ),
      lastName: new UntypedFormControl(this.user ? this.user.lastName : null,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\-]*')
        ]
      ),
      email: new UntypedFormControl(this.user ? this.user.email : null,
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')
        ]
      ),
      roles: new UntypedFormControl(null,
        [
          Validators.required
        ]
      ),
    }, {
      validators: [
        MustMatch('password', 'passwordConfirm'),
        UsernameNotUsed('username', this.userService, this.user?.username ?? null),
        EmailNotUsed('email', this.userService, this.user?.username ?? null),
      ]
    });
    if (this.isEdit) {
      this.formGroup.controls['username'].disable();
      this.user.roles.forEach(role => {
        this.selectedRoles.push(role);
      });
      this.formGroup.controls['roles'].setValue(this.selectedRoles);
    }
    else {
      this.formGroup.controls['password'].setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{1,40}$'),
        Validators.maxLength(40)
      ]);
      this.formGroup.controls['passwordConfirm'].setValidators([
        Validators.required
      ]);
    }
  }

  get form() {
    return this.formGroup.controls;
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
    if (!this.changePassword) {
      this.formGroup.controls['password'].disable();
      this.formGroup.controls['passwordConfirm'].disable();
      this.formGroup.controls['password'].setValidators(null);
      this.formGroup.controls['passwordConfirm'].setValidators(null);
    }
    else {
      this.formGroup.controls['password'].enable();
      this.formGroup.controls['passwordConfirm'].enable();
      this.formGroup.controls['password'].setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('((?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\\W)\\w.{6,18}\\w)'),
        Validators.maxLength(40)
      ]);
      this.formGroup.controls['passwordConfirm'].setValidators([
        Validators.required
      ]);
    }
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
      this.addUser();
    }
    else {
      this.editUser();
    }
  }

  getNewUser() {
    let newUser = new User();
    newUser.username = this.form.username.value;
    newUser.firstName = this.form.firstName.value;
    newUser.lastName = this.form.lastName.value;
    newUser.email = this.form.email.value;
    if (this.changePassword) {
      newUser.password = this.form.password.value;
    }
    else {
      newUser.password = undefined;
    }
    newUser.roles = this.form.roles.value;
    return newUser;
  }

  addUser() {
    this.changePassword = true;
    this.markFormGroupTouched(this.formGroup);
    console.log(this.formGroup);
    if (!this.formGroup.invalid) {
      this.userService.createUser(this.getNewUser()).subscribe(res => {
        this.activeModal.close('confirm');
        this.showToast('Użytkownik został dodany',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
        error => {
          this.showToast('Użytkownik nie został dodany',
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

  editUser() {
    this.markFormGroupTouched(this.formGroup);
    if (!this.formGroup.invalid) {
      this.userService.updateUser(this.user.id, this.getNewUser()).subscribe(res => {
        this.activeModal.close('confirm');
        this.showToast('Użytkownik został zaktualizowany',
          'Udało się!',
          'success',
          false,
          'bottom-end',
          6000);
      },
        error => {
          this.showToast('Użytkownik nie został zaktualizowany',
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

  userHasRole(roleId: number) {
    return this.user.roles.some(element => element.id == roleId);
  }

}
