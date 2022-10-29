import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {

  private alive = true;

  subscription: any;

  authenticated: boolean = false;
  token: string = '';

  constructor(
    // protected auth: NbAuthService
  ) {

    // this.subscription = auth.onAuthenticationChange()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((authenticated: boolean) => {
    //     this.authenticated = authenticated;
    //   });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
