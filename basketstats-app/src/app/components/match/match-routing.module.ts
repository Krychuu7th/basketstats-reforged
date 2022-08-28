import {NgModule} from '@angular/core';
import {AuthGuard} from "../auth/auth-guard.service";
import {ViewType} from "../../enums/view-type.enum";
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "../user/user.component";
import {UserMatchesComponent} from "../user/user-matches/user-matches.component";
import {MatchComponent} from "./match.component";
import {MatchSettingsComponent} from "./match-settings/match-settings.component";
import {MatchInProgressComponent} from "./match-in-progress/match-in-progress.component";

const matchRoutes: Routes = [
  {
    path: 'match', component: MatchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USER'],
      viewType: ViewType.MATCH
    },
    children: [
      {
        path: 'settings/:id', component: MatchSettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'progress/:id/:q', component: MatchInProgressComponent,
        canActivate: [AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(matchRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MatchRoutingModule { }
