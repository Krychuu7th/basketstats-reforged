import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as LeagueActions from 'src/app/components/league/state/league.actions';
import { LoaderService } from '../../service/loader/loader.service';



@Injectable()
export class LoaderEffects {


  showLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LeagueActions.loadLeagues,
        LeagueActions.loadAllLeagues
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
        LeagueActions.loadLeaguesFailure
      ),
      tap(() =>
        this.loaderService.hide()
      ),
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private loaderService: LoaderService) { }
}
