import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewType } from 'src/app/enums/view-type.enum';
import { LeagueComponent } from './league.component';

const routes: Routes = [
  {
    path: '',
    data: {
      viewType: ViewType.LEAGUES
    },
    children: [
      {
        path: '', component: LeagueComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueRoutingModule { }
