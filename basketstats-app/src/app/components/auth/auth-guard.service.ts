import { Injectable } from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from "@angular/router";
import {NbAuthService} from "@nebular/auth";
import {tap} from "rxjs/operators";
import {NbGlobalPosition, NbToastrService} from "@nebular/theme";
import {NbComponentStatus} from "@nebular/theme/components/component-status";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: NbAuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private nbToastrService: NbToastrService) { }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if(!authenticated) {
            this.showToast('danger', true, 'bottom-end', 6000);
            this.router.navigate(['auth/login']);
          }
        })
      );
  }

  showToast(status, preventDuplicates, position, duration) {
    this.nbToastrService.show('Brak dostępu do treści', `MUSISZ SIĘ ZALOGOWAĆ`,
      { status, preventDuplicates, position, duration });
  }
}
