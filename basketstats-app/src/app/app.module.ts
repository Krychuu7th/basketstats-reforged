import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import localePl from '@angular/common/locales/pl';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbThemeModule, NbTimepickerModule,
  NbToastrModule,
  NbUserModule
} from "@nebular/theme";
import {
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthJWTInterceptor,
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy
} from '@nebular/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NavHeaderComponent} from './components/header/nav-header/nav-header.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpRequest} from "@angular/common/http";
import {SidebarHeaderComponent} from './components/header/sidebar-header/sidebar-header.component';
import {LoginComponent} from './components/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./components/auth/auth-guard.service";
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import {RoleProvider} from "./providers/role.provider";
import {HomepageComponent} from './components/homepage/homepage.component';
import {environment} from "../environments/environment";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {AuthComponent} from "./components/auth/auth.component";
import {TeamComponent} from './components/team/team.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from "@angular/material/tabs";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {getPolishPaginatorIntl} from "./translations/polish-paginator-intl";
import {TeamPlayersComponent} from './components/team/team-players/team-players.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AppInitService} from "./app-init.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ScheduleComponent} from './components/schedule/schedule.component';
import {LogoutComponent} from './components/auth/logout/logout.component';
import {MatchScheduleListComponent} from './components/schedule/match-schedule-list/match-schedule-list.component';
import {TeamPlayersListComponent} from './components/team/team-players-list/team-players-list.component';
import {MatchStatsComponent} from './components/schedule/match-stats/match-stats.component';
import {MatchInfoRowComponent} from './components/schedule/match-info-row/match-info-row.component';
import {TeamPlayersAvgStatsListComponent} from './components/team/team-players-avg-stats-list/team-players-avg-stats-list.component';
import {RingChartModule} from "st-ring-chart";
import {ChartsModule} from "ng2-charts";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatchStatsForPlayersComponent} from './components/schedule/match-stats/match-stats-for-players/match-stats-for-players.component';
import {QuarterStatsForPlayersComponent} from './components/schedule/match-stats/match-stats-for-players/quarter-stats-for-players/quarter-stats-for-players.component';
import {QuarterStatsForPlayersByTeamComponent} from './components/schedule/match-stats/match-stats-for-players/quarter-stats-for-players/quarter-stats-for-players-by-team/quarter-stats-for-players-by-team.component';
import {MatchStatsSummaryForPlayersComponent} from './components/schedule/match-stats/match-stats-for-players/match-stats-summary-for-players/match-stats-summary-for-players.component';
import {MatchStatsSummaryForPlayersOfTeamComponent} from './components/schedule/match-stats/match-stats-for-players/match-stats-summary-for-players/match-stats-summary-for-players-of-team/match-stats-summary-for-players-of-team.component';
import {AdministrationModule} from "./components/administration/administration.module";
import { UserComponent } from './components/user/user.component';
import {UserModule} from "./components/user/user.module";
import { MatchComponent } from './components/match/match.component';
import {MatchModule} from "./components/match/match.module";
import {GlobalErrorHandler} from "./helpers/handlers/global-error-handler";
import {HttpErrorInterceptor} from "./helpers/interceptors/http-error.interceptor";
import {ContextMenuModule} from "ngx-contextmenu";
import {ReversePipe} from "./helpers/pipes/reverse.pipe";

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
        NbLayoutModule,
        NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
        BrowserAnimationsModule,
        NbThemeModule.forRoot({name: 'default'}),
        NbEvaIconsModule,
        NbIconModule,
        FlexLayoutModule,
        HttpClientModule,
        NbAuthModule.forRoot({
            strategies: [
                NbPasswordAuthStrategy.setup({
                    name: 'email',

                    token: {
                        class: NbAuthJWTToken,
                        key: 'token',
                    },

                    //configuration of api endpoints for nbAuth
                    baseEndpoint: 'http://localhost:8080/api/auth/',
                    login: {
                        endpoint: 'login',
                        method: 'post',
                        redirect: {
                            success: '/',
                            failure: null, // stay on the same page
                        },
                        defaultErrors: ['Wprowadzono błędne dane.'],
                        defaultMessages: ['Zalogowano.']
                    },
                    register: {
                        endpoint: 'sign-up',
                        method: 'post',

                    },
                    logout: {
                        endpoint: 'logout',
                        method: 'post',
                        redirect: {
                            success: '/auth/login',
                            failure: null
                        },
                        defaultErrors: ['Wystąpił nieoczenikany błąd, spróbuj ponownie.'],
                        defaultMessages: ['Zostałeś wylogowany.'],
                    },
                    requestPass: {
                        endpoint: 'request-pass',
                        method: 'post',

                    },
                    resetPass: {
                        endpoint: 'reset-pass',
                        method: 'post',

                    },
                    refreshToken: {
                        endpoint: 'refresh-token',
                        method: 'post',
                    }
                }),
            ],

            //configuration of nbAuth forms
            forms: {
                login: {
                    redirectDelay: 0,
                    showMessages: {
                        success: true,
                    },
                },
                register: {
                    redirectDelay: 0,

                    terms: false,
                },
                requestPassword: {
                    redirectDelay: 0,
                    showMessages: {
                        success: true,
                    },
                },
                resetPassword: {
                    redirectDelay: 0,
                    showMessages: {
                        success: true,
                    },
                },
                logout: {
                    redirectDelay: 0,
                },
                validation: {
                    password: {
                        required: true,
                        minLength: 8,
                        maxLength: 40,

                    }
                },
            },
        }),
        FormsModule,
        NbAlertModule,
        NbInputModule,
        NbCheckboxModule,
        NbUserModule,
        NbSecurityModule.forRoot({
            accessControl: {
                ROLE_GUEST: {
                    view: ['auth'],
                },
                ROLE_USER: {
                    view: ['logout', 'user_panel']
                },
                ROLE_ADMIN: {
                    view: ['admin_panel']
                },
            }
        }),
        MatButtonModule,
        MatRippleModule,
        NbCardModule,
        NgbModule,
        MatTabsModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        NbFormFieldModule,
        NbButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatTooltipModule,
        NbToastrModule.forRoot(),
        ReactiveFormsModule,
        NbSelectModule,
        MatProgressBarModule,
        RingChartModule,
        ChartsModule,
        MatSlideToggleModule,
        NbDatepickerModule.forRoot(),
        NbTimepickerModule.forRoot(),
        ContextMenuModule.forRoot()
    ],
    providers: [
        NbSidebarService,
        AuthGuard,
        {
            provide: NbRoleProvider,
            useClass: RoleProvider
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NbAuthJWTInterceptor,
            multi: true
        },
        {
            provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
            useValue: function (req: HttpRequest<any>) {
                return req.url === environment.url + '/refresh-token';
            },
        },
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

export const interceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true }];
