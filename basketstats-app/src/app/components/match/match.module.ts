import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ReversePipe } from "../../helpers/pipes/reverse.pipe";
import { MatchInProgressComponent } from './match-in-progress/match-in-progress.component';
import { MatchRoutingModule } from "./match-routing.module";
import { MatchSettingsComponent } from './match-settings/match-settings.component';

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
    // NbSelectModule,
    // ContextMenuModule.forRoot(),
    // NbCardModule,
    // NbListModule
  ]
})
export class MatchModule { }
