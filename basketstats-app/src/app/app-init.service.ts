import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private authService: AuthService
  ) { }

  initApp() {
  }
}
