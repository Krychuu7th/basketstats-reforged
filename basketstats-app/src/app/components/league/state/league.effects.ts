import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LeagueService } from '../league.service';
import * as LeagueActions from './league.actions';



@Injectable()
export class LeagueEffects {

  loadLeagues$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(LeagueActions.loadLeagues),
        mergeMap((action) =>
          this.leagueService.getLeagues(action.queryParams).pipe(
            map(data => LeagueActions.loadLeaguesSuccess({ leagues: data.content })),
            catchError(error => of(LeagueActions.loadLeaguesFailure({ error }))))
          ),
    );
  });

  loadAllLeagues$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(LeagueActions.loadAllLeagues),
        mergeMap((action) =>
          this.leagueService.getAllLeagues().pipe(
            map(data => LeagueActions.loadLeaguesSuccess({ leagues: data })),
            catchError(error => of(LeagueActions.loadLeaguesFailure({ error }))))
          ),
    );
  });

  constructor(
    private actions$: Actions,
    private leagueService: LeagueService
  ) { }
}
