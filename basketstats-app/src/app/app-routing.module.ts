import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NbRequestPasswordComponent, NbResetPasswordComponent} from "@nebular/auth";
import {LoginComponent} from "./components/auth/login/login.component"
import {AuthGuard} from "./components/auth/auth-guard.service";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {AuthComponent} from "./components/auth/auth.component";
import {TeamComponent} from "./components/team/team.component";
import {ViewType} from "./enums/view-type.enum";
import {TeamPlayersComponent} from "./components/team/team-players/team-players.component";
import {LogoutComponent} from "./components/auth/logout/logout.component";
import {ScheduleComponent} from "./components/schedule/schedule.component";
import {MatchStatsComponent} from "./components/schedule/match-stats/match-stats.component";

export const appRoutes: Routes = [

  {
    path: '',
    component: HomepageComponent
  },

  {
    path: 'teams',
    data: {
      viewType: ViewType.TEAMS
    },
    children:[
      {
        path: '',  component: TeamComponent,
      },
      {
        path: 'info/:id', component: TeamPlayersComponent
      }
    ]
  },

  {
    path: 'schedule',
    data: {
      viewType: ViewType.SCHEDULE
    },
    children:[
      {
        path: '',  component: ScheduleComponent,
      },
      {
        path: 'match/:id', component: MatchStatsComponent
      }
    ]
  },

  {
    path: 'auth',
    component: AuthComponent,
    data: {
    viewType: ViewType.AUTH
    },
    children: [
      {
        path: '',
        component: LoginComponent,
        data: {
          roles: ['ROLE_GUEST']
        },
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          roles: ['ROLE_GUEST']
        },
      },
      {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      {
        useHash: true
      })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
