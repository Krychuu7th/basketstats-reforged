import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ViewType } from 'src/app/enums/view-type.enum';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent {
  public activeViewType: ViewType;
  public ViewTypeEnum = ViewType;
  public menuOpened: boolean = false;

  constructor(
    public authService: AuthService
  ) { }
}
