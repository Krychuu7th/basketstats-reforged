import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPassword = false;
  isLoading = false;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;

  constructor(
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {

    // this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    // this.showMessages = this.getConfigValue('forms.login.showMessages');
    // this.strategy = this.getConfigValue('forms.login.strategy');
    // this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  login(): void {
    this.isLoading = true;
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    // this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
    //   this.submitted = false;

    //   if (result.isSuccess()) {
    //     this.messages = result.getMessages();
    //     this.showToast('', 'Zalogowano!', 'success', true, 'bottom-end', 6000);
    //   } else {
    //     this.user.password = '';
    //     this.errors = result.getErrors();
    //     this.showToast('Błędna nazwa użytkownika lub hasło', 'Błędne dane!', 'warning', true, 'bottom-end', 6000);
    //   }

    //   const redirect = result.getRedirect();
    //   if (redirect) {
    //     setTimeout(() => {
    //       return this.router.navigateByUrl(redirect);
    //     }, this.redirectDelay);
    //   }
    //   this.isLoading = false;
    //   this.cd.detectChanges();
    // });
  }

  // getConfigValue(key: string): any {
  //   return getDeepFromObject(this.options, key, null);
  // }

  // showToast(message: string, title: string, status, preventDuplicates, position, duration) {
  //   this.nbToastrService.show(message, title,
  //     { status, preventDuplicates, position, duration });
  // }

}
