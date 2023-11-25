import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewType } from 'src/app/enums/view-type.enum';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { TeamComponent } from './team.component';

const routes: Routes = [
  {
    path: '',
    data: {
      viewType: ViewType.TEAMS
    },
    children: [
      {
        path: '', component: TeamComponent,
      },
      {
        path: 'info/:id', component: TeamPlayersComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
