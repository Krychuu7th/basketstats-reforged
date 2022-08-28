import {NgModule} from '@angular/core';
import {AuthGuard} from "../auth/auth-guard.service";
import {ViewType} from "../../enums/view-type.enum";
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user.component";
import {UserMatchesComponent} from "./user-matches/user-matches.component";

const userRoutes: Routes = [
  {
    path: 'user', component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USER'],
      viewType: ViewType.USER_PANEL
    },
    children: [
      {
        path: '', component: UserMatchesComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_USER']
        }
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
