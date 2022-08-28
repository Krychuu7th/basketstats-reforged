import { NgModule }             from '@angular/core';
import {AdministrationComponent} from "./administration.component";
import {AuthGuard} from "../auth/auth-guard.service";
import {ViewType} from "../../enums/view-type.enum";
import {UserListComponent} from "./user-list/user-list.component";
import {AdminViewType} from "../../enums/admin-view-type.enum";
import {MatchAdministrationComponent} from "./match-administration/match-administration.component";
import {RouterModule, Routes} from "@angular/router";
import {TeamAdministrationComponent} from "./team-administration/team-administration.component";

const administrationRoutes: Routes = [
  {
    path: 'admin', component: AdministrationComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN'],
      viewType: ViewType.USER_PANEL
    },
    children: [
      {
        path: '', component: UserListComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_ADMIN'],
          adminViewType: AdminViewType.USERS
        },
      },
      {
        path: 'users', component: UserListComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_ADMIN'],
          adminViewType: AdminViewType.USERS
        },
      },
      {
        path: 'matches', component: MatchAdministrationComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_ADMIN'],
          adminViewType: AdminViewType.MATCHES
        }
      },
      {
        path: 'teams', component: TeamAdministrationComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_ADMIN'],
          adminViewType: AdminViewType.TEAMS
        }
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(administrationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdministrationRoutingModule { }
