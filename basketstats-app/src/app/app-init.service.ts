import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
  ) { }

  refreshJwtToken() {
    // return this.nbAuthService.isAuthenticated()
    //   .toPromise()
    //   .then(
    //     data => {
    //       if(!data) {
    //         localStorage.removeItem('auth_app_token');
    //       }
    //     }
    //   )
  }
}
