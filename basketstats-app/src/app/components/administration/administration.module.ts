import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeagueEffects } from '../league/state/league.effects';
import * as fromLeague from '../league/state/league.reducer';
import { TeamCardListComponent } from "../team/team-card-list/team-card-list.component";
import { AdminNavigationBarComponent } from "./admin-navigation-bar/admin-navigation-bar.component";
import { AdministrationRoutingModule } from "./administration-routing.module";
import { AdministrationComponent } from "./administration.component";
import { LinkUserConfirmComponent } from './match-administration/link-user-confirm/link-user-confirm.component';
import { MatchAddComponent } from './match-administration/match-add/match-add.component';
import { MatchAdministrationListComponent } from './match-administration/match-administration-list/match-administration-list.component';
import { MatchAdministrationComponent } from "./match-administration/match-administration.component";
import { MatchDeleteConfirmComponent } from './match-administration/match-delete-confirm/match-delete-confirm.component';
import { MatchEditComponent } from './match-administration/match-edit/match-edit.component';
import { PlayerAddEditComponent } from './player-administration/player-add-edit/player-add-edit.component';
import { PlayerDeleteConfirmComponent } from './player-administration/player-delete-confirm/player-delete-confirm.component';
import { LeagueAddEditComponent } from './team-administration/league-add-edit/league-add-edit.component';
import { LeagueDeleteConfirmComponent } from './team-administration/league-delete-confirm/league-delete-confirm.component';
import { TeamAddEditComponent } from './team-administration/team-add-edit/team-add-edit.component';
import { TeamAdministrationComponent } from './team-administration/team-administration.component';
import { TeamDeleteConfirmComponent } from './team-administration/team-delete-confirm/team-delete-confirm.component';
import { TeamTableListComponent } from './team-administration/team-table-list/team-table-list.component';
import { UserAddEditComponent } from "./user-add-edit/user-add-edit.component";
import { UserDeleteConfirmComponent } from "./user-delete-confirm/user-delete-confirm.component";
import { UserListComponent } from "./user-list/user-list.component";

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
    SharedModule,
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
    MatTabsModule,
    MatRippleModule,
    MatSelectModule,
    StoreModule.forFeature(fromLeague.leaguesFeatureKey, fromLeague.reducer),
    EffectsModule.forFeature([LeagueEffects])
  ]
})
export class AdministrationModule { }
