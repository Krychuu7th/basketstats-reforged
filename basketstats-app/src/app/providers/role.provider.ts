import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RoleProvider 
// implements NbRoleProvider 
{

  constructor(
    // private authService: NbAuthService
    ) {
  }

  getRole(): Observable<string> {
    return of('ROLE_ADMIN');
    // return this.authService.onTokenChange()
    //   .pipe(
    //     map((token: NbAuthJWTToken) => {
    //       return token.isValid() ? token.getPayload()['role'] :'ROLE_GUEST';
    //     }),
    //   );
  }
}
