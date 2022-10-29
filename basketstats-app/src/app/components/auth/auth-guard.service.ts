import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    // private authService: NbAuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private nbToastrService: NbToastrService
  ) { }

  canActivate() {
    return true;
    // return this.authService.isAuthenticated()
    //   .pipe(
    //     tap(authenticated => {
    //       if (!authenticated) {
    //         this.showToast('danger', true, 'bottom-end', 6000);
    //         this.router.navigate(['auth/login']);
    //       }
    //     })
    //   );
  }

  showToast(status, preventDuplicates, position, duration) {
    // this.nbToastrService.show('Brak dostępu do treści', `MUSISZ SIĘ ZALOGOWAĆ`,
    //   { status, preventDuplicates, position, duration });
  }
}
