import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {getDeepFromObject, NB_AUTH_OPTIONS, NbAuthResult, NbAuthService} from "@nebular/auth";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'nb-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  redirectDelay: number = 0;
  strategy: string = '';

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router,
              private nbToastrService: NbToastrService) {
    this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = this.getConfigValue('forms.logout.strategy');
  }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    this.service.logout(strategy).subscribe((result: NbAuthResult) => {
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.showToast('','Wylogowano!', 'success', true, 'bottom-end', 6000);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  showToast(message: string, title: string, status, preventDuplicates, position, duration) {
    this.nbToastrService.show(message, title,
      { status, preventDuplicates, position, duration });
  }
}
