import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as LeagueActions from 'src/app/components/league/state/league.actions';
import * as TeamActions from 'src/app/components/team/state/team.actions';
import { LoaderService } from '../../service/loader/loader.service';



@Injectable()
export class LoaderEffects {


  showLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LeagueActions.loadLeagues,
        LeagueActions.loadAllLeagues,
        LeagueActions.loadLeague,
        LeagueActions.addLeague,
        LeagueActions.upsertLeague,
        LeagueActions.deleteLeague,
        TeamActions.loadTeams,
      ),
      tap(() =>
        this.loaderService.show()
      )
    ),
    { dispatch: false }
  );


  hideLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LeagueActions.loadLeaguesSuccess,
        LeagueActions.loadLeaguesFailure,
        LeagueActions.loadAllLeaguesSuccess,
        LeagueActions.loadAllLeaguesFailure,
        LeagueActions.loadLeagueSuccess,
        LeagueActions.loadLeagueFailure,
        LeagueActions.addLeagueSuccess,
        LeagueActions.addLeagueFailure,
        LeagueActions.upsertLeagueSuccess,
        LeagueActions.upsertLeagueFailure,
        LeagueActions.deleteLeagueSuccess,
        LeagueActions.deleteLeagueFailure,
        TeamActions.loadTeamsSuccess,
        TeamActions.loadTeamsFailure,
      ),
      tap(() =>
        this.loaderService.hide()
      ),
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private loaderService: LoaderService) { }
}
