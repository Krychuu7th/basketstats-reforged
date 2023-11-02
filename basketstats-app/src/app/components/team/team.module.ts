import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { TeamRoutingModule } from './team-routing.module';

import { TeamComponent } from './team.component';


@NgModule({
  declarations: [
    TeamComponent,
    TeamPlayersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TeamRoutingModule,
    MatTabsModule,
  ]
})
export class TeamModule { }
