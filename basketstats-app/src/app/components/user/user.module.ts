import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from "./user-routing.module";
import { UserMatchesComponent } from './user-matches/user-matches.component';
import {UserMatchesListComponent} from "./user-matches/user-matches-list/user-matches-list.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [UserMatchesComponent, UserMatchesListComponent, UserMatchesListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatProgressBarModule,
    MatTabsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule
  ]
})
export class UserModule { }
