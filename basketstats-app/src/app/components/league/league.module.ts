import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';


@NgModule({
  declarations: [
    LeagueComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LeagueRoutingModule
  ]
})
export class LeagueModule { }
