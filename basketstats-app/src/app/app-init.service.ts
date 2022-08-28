import { Injectable } from '@angular/core';
import {NbAuthService} from "@nebular/auth";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private nbAuthService: NbAuthService
  ) { }

  refreshJwtToken() {
    return this.nbAuthService.isAuthenticated()
      .toPromise()
      .then(
        data => {
          if(!data) {
            localStorage.removeItem('auth_app_token');
          }
        }
      )
  }
}
