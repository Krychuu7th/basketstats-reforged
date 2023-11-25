import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { BasketStatsAppState } from 'src/app/store';
import { LeagueService } from '../league.service';
import * as LeagueActions from './league.actions';



@Injectable()
export class LeagueEffects {

  loadLeagues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeagueActions.loadLeagues),
      mergeMap((action) =>
        this.leagueService.get(action.queryParams).pipe(
          map((data) => LeagueActions.loadLeaguesSuccess({ leaguesPage: data, queryParams: action.queryParams })),
          catchError((error) => of(LeagueActions.loadLeaguesFailure({ error }))))
      ),
    );
  });

  loadAllLeagues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeagueActions.loadAllLeagues),
      mergeMap(() =>
        this.leagueService.getAll().pipe(
          map((data) => LeagueActions.loadAllLeaguesSuccess({ leagues: data })),
          catchError((error) => of(LeagueActions.loadLeaguesFailure({ error }))))
      ),
    );
  });

  loadLeague$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeagueActions.loadLeague),
      mergeMap((action) =>
        this.leagueService.getById(action.id).pipe(
          map((data) => LeagueActions.loadLeagueSuccess({ league: data })),
          catchError((error) => of(LeagueActions.loadLeagueFailure({ error }))))
      ),
    );
  });

  createLeague$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeagueActions.addLeague),
      mergeMap((action) =>
        this.leagueService.create(action.league).pipe(
          withLatestFrom(this.store),
          switchMap(([data, storeState]) => [
            LeagueActions.addLeagueSuccess({ league: data }),
            LeagueActions.loadLeagues({ queryParams: storeState.leagues.queryParams })
          ]),
          catchError((error) => of(LeagueActions.addLeagueFailure({ error }))))
      ),
    );
  });

  updateLeague$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeagueActions.upsertLeague),
      mergeMap((action) =>
        this.leagueService.update(action.league).pipe(
          withLatestFrom(this.store),
          switchMap(([data, storeState]) => [
            LeagueActions.upsertLeagueSuccess({ league: data }),
            LeagueActions.loadLeagues({ queryParams: storeState.leagues.queryParams })
          ]),
          catchError((error) => of(LeagueActions.upsertLeagueFailure({ error }))))
      ),
    );
  });

  deleteLeague$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeagueActions.deleteLeague),
      mergeMap((action) =>
        this.leagueService.delete(action.id).pipe(
          withLatestFrom(this.store),
          switchMap(([, storeState]) => [
            LeagueActions.deleteLeagueSuccess(),
            LeagueActions.loadLeagues({ queryParams: storeState.leagues.queryParams })
          ]),
          catchError((error) => of(LeagueActions.upsertLeagueFailure({ error }))))
      ),
    );
  });


  constructor(
    private actions$: Actions,
    private store: Store<BasketStatsAppState>,
    private leagueService: LeagueService
  ) { }
}
