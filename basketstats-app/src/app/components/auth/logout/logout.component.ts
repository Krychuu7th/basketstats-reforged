import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nb-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  redirectDelay: number = 0;
  strategy: string = '';

  constructor(
    protected router: Router
  ) {
    // this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    // this.strategy = this.getConfigValue('forms.logout.strategy');
  }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    // this.service.logout(strategy).subscribe((result: NbAuthResult) => {
    //   const redirect = result.getRedirect();
    //   if (redirect) {
    //     setTimeout(() => {
    //       return this.router.navigateByUrl(redirect);
    //     }, this.redirectDelay);
    //   }
    //   this.showToast('', 'Wylogowano!', 'success', true, 'bottom-end', 6000);
    // });
  }

  // getConfigValue(key: string): any {
  //   return getDeepFromObject(this.options, key, null);
  // }

  // showToast(message: string, title: string, status: string, preventDuplicates: boolean, position: string, duration: number) {
  //   this.nbToastrService.show(message, title,
  //     { status, preventDuplicates, position, duration });
  // }
}
