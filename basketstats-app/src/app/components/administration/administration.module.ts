import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministrationComponent} from "./administration.component";
import {UserDeleteConfirmComponent} from "./user-delete-confirm/user-delete-confirm.component";
import {MatchAdministrationComponent} from "./match-administration/match-administration.component";
import {UserAddEditComponent} from "./user-add-edit/user-add-edit.component";
import {AdminNavigationBarComponent} from "./admin-navigation-bar/admin-navigation-bar.component";
import {UserListComponent} from "./user-list/user-list.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NbButtonModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTimepickerModule
} from "@nebular/theme";
import {AdministrationRoutingModule} from "./administration-routing.module";
import {TeamAdministrationComponent} from './team-administration/team-administration.component';
import {MatTabsModule} from "@angular/material/tabs";
import {TeamTableListComponent} from './team-administration/team-table-list/team-table-list.component';
import {LeagueAddEditComponent} from './team-administration/league-add-edit/league-add-edit.component';
import {LeagueDeleteConfirmComponent} from './team-administration/league-delete-confirm/league-delete-confirm.component';
import {TeamCardListComponent} from "../team/team-card-list/team-card-list.component";
import {MatRippleModule} from "@angular/material/core";
import {TeamAddEditComponent} from './team-administration/team-add-edit/team-add-edit.component';
import {TeamDeleteConfirmComponent} from './team-administration/team-delete-confirm/team-delete-confirm.component';
import { PlayerAddEditComponent } from './player-administration/player-add-edit/player-add-edit.component';
import { PlayerDeleteConfirmComponent } from './player-administration/player-delete-confirm/player-delete-confirm.component';
import { MatchAdministrationListComponent } from './match-administration/match-administration-list/match-administration-list.component';
import {MatSelectModule} from "@angular/material/select";
import { LinkUserConfirmComponent } from './match-administration/link-user-confirm/link-user-confirm.component';
import { MatchAddComponent } from './match-administration/match-add/match-add.component';
import { MatchEditComponent } from './match-administration/match-edit/match-edit.component';
import { MatchDeleteConfirmComponent } from './match-administration/match-delete-confirm/match-delete-confirm.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    UserListComponent,
    UserAddEditComponent,
    UserDeleteConfirmComponent,
    AdminNavigationBarComponent,
    MatchAdministrationComponent,
    TeamAdministrationComponent,
    TeamTableListComponent,
    LeagueAddEditComponent,
    LeagueDeleteConfirmComponent,
    TeamCardListComponent,
    TeamAddEditComponent,
    TeamDeleteConfirmComponent,
    PlayerAddEditComponent,
    PlayerDeleteConfirmComponent,
    MatchAdministrationListComponent,
    LinkUserConfirmComponent,
    MatchAddComponent,
    MatchEditComponent,
    MatchDeleteConfirmComponent
  ],
  exports: [
    TeamCardListComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatSortModule,
    MatMenuModule,
    MatProgressBarModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    MatTabsModule,
    MatRippleModule,
    NbFormFieldModule,
    MatSelectModule,
    NbDatepickerModule,
    NbTimepickerModule
  ]
})
export class AdministrationModule { }
