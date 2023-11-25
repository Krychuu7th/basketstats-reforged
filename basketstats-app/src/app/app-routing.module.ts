import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { NotFoundPageComponent } from "./components/not-found-page/not-found-page.component";
import { MatchStatsComponent } from "./components/schedule/match-stats/match-stats.component";
import { ScheduleComponent } from "./components/schedule/schedule.component";
import { ViewType } from "./enums/view-type.enum";

export const appRoutes: Routes = [

  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent
  },

  { path: 'leagues', loadChildren: () => import('./components/league/league.module').then(m => m.LeagueModule) },
  { path: 'teams', loadChildren: () => import('./components/team/team.module').then(m => m.TeamModule) },

  {
    path: 'schedule',
    data: {
      viewType: ViewType.SCHEDULE
    },
    children: [
      {
        path: '', component: ScheduleComponent,
      },
      {
        path: 'match/:id', component: MatchStatsComponent
      }
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      {
        useHash: true,
        relativeLinkResolution: 'legacy'
      })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
