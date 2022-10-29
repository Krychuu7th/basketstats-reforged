import { registerLocaleData } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import localePl from '@angular/common/locales/pl';
import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppInitService } from "./app-init.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministrationModule } from "./components/administration/administration.module";
import { AuthGuard } from "./components/auth/auth-guard.service";
import { AuthComponent } from "./components/auth/auth.component";
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { NavHeaderComponent } from "./components/header/nav-header/nav-header.component";
import { SidebarHeaderComponent } from './components/header/sidebar-header/sidebar-header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MatchComponent } from './components/match/match.component';
import { MatchModule } from "./components/match/match.module";
import { MatchInfoRowComponent } from './components/schedule/match-info-row/match-info-row.component';
import { MatchScheduleListComponent } from './components/schedule/match-schedule-list/match-schedule-list.component';
import { MatchStatsForPlayersComponent } from './components/schedule/match-stats/match-stats-for-players/match-stats-for-players.component';
import { MatchStatsSummaryForPlayersOfTeamComponent } from './components/schedule/match-stats/match-stats-for-players/match-stats-summary-for-players/match-stats-summary-for-players-of-team/match-stats-summary-for-players-of-team.component';
import { MatchStatsSummaryForPlayersComponent } from './components/schedule/match-stats/match-stats-for-players/match-stats-summary-for-players/match-stats-summary-for-players.component';
import { QuarterStatsForPlayersByTeamComponent } from './components/schedule/match-stats/match-stats-for-players/quarter-stats-for-players/quarter-stats-for-players-by-team/quarter-stats-for-players-by-team.component';
import { QuarterStatsForPlayersComponent } from './components/schedule/match-stats/match-stats-for-players/quarter-stats-for-players/quarter-stats-for-players.component';
import { MatchStatsComponent } from './components/schedule/match-stats/match-stats.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { TeamPlayersAvgStatsListComponent } from './components/team/team-players-avg-stats-list/team-players-avg-stats-list.component';
import { TeamPlayersListComponent } from './components/team/team-players-list/team-players-list.component';
import { TeamPlayersComponent } from './components/team/team-players/team-players.component';
import { TeamComponent } from './components/team/team.component';
import { UserComponent } from './components/user/user.component';
import { UserModule } from "./components/user/user.module";
import { GlobalErrorHandler } from "./helpers/handlers/global-error-handler";
import { HttpErrorInterceptor } from "./helpers/interceptors/http-error.interceptor";
import { getPolishPaginatorIntl } from "./translations/polish-paginator-intl";

registerLocaleData(localePl);

registerLocaleData(localePl);

@NgModule({
    declarations: [
        AppComponent,
        NavHeaderComponent,
        SidebarHeaderComponent,
        LoginComponent,
        HomepageComponent,
        AuthComponent,
        TeamComponent,
        TeamPlayersComponent,
        ScheduleComponent,
        LogoutComponent,
        MatchScheduleListComponent,
        TeamPlayersListComponent,
        MatchStatsComponent,
        MatchInfoRowComponent,
        TeamPlayersAvgStatsListComponent,
        MatchStatsForPlayersComponent,
        QuarterStatsForPlayersComponent,
        QuarterStatsForPlayersByTeamComponent,
        MatchStatsSummaryForPlayersComponent,
        MatchStatsSummaryForPlayersOfTeamComponent,
        UserComponent,
        MatchComponent
    ],
    imports: [
        BrowserModule,
        AdministrationModule,
        UserModule,
        MatchModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatTabsModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatSlideToggleModule
    ],
    providers: [
        AuthGuard,
        {
            provide: MatPaginatorIntl,
            useValue: getPolishPaginatorIntl()
        },
        AppInitService,
        {
            provide: APP_INITIALIZER,
            useFactory: (appInitService: AppInitService) => () => {
                return appInitService.refreshJwtToken()
            },
            deps: [AppInitService],
            multi: true
        },
        {
          provide: LOCALE_ID, useValue: 'pl-PL'
        },
      {
        provide: ErrorHandler,
        useClass: GlobalErrorHandler
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true
      }
    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
