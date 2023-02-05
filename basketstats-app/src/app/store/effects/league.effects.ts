import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LeagueService } from 'src/app/components/league/league.service';
import * as leagueActions from '../actions/league.actions';


@Injectable()
export class LeagueEffects {

  loadLeagues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(leagueActions.loadLeagues),
      mergeMap(() =>
        this.leagueService.getLeagueList().pipe(
          map(data => leagueActions.loadLeaguesSuccess({ data: data })),
          catchError(error => of(leagueActions.loadLeaguesFailure({ error }))))
      ),
    );
  });
  
  constructor(private actions$: Actions, private leagueService: LeagueService) { }
}
