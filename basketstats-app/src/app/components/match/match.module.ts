import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatchRoutingModule} from "./match-routing.module";
import { MatchSettingsComponent } from './match-settings/match-settings.component';
import {MatDividerModule} from "@angular/material/divider";
import { MatchInProgressComponent } from './match-in-progress/match-in-progress.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";
import {NbCardModule, NbListModule, NbSelectModule} from "@nebular/theme";
import {ContextMenuModule} from "ngx-contextmenu";
import {ReversePipe} from "../../helpers/pipes/reverse.pipe";

@NgModule({
  declarations: [
    MatchSettingsComponent,
    MatchInProgressComponent,
    ReversePipe
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    MatProgressBarModule,
    MatTabsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule,
    MatDividerModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    NbSelectModule,
    ContextMenuModule.forRoot(),
    NbCardModule,
    NbListModule
  ]
})
export class MatchModule { }
