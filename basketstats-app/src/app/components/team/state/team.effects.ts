import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { BasketStatsAppState } from 'src/app/store';
import { TeamService } from '../team.service';
import * as TeamActions from './team.actions';


@Injectable()
export class TeamEffects {

  loadTeams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeamActions.loadTeams),
      mergeMap((action) =>
        this.teamService.getForLeague(action.leagueId, action.queryParams).pipe(
          map((data) => TeamActions.loadTeamsSuccess({ leagueId: action.leagueId, teamsPage: data, queryParams: action.queryParams })),
          catchError((error) => of(TeamActions.loadTeamsFailure({ error }))))
      ),
    );
  });

  loadAllTeams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeamActions.loadAllTeams),
      mergeMap(() =>
        this.teamService.getAll().pipe(
          map((data) => TeamActions.loadAllTeamsSuccess({ teams: data })),
          catchError((error) => of(TeamActions.loadTeamsFailure({ error }))))
      ),
    );
  });

  loadTeam$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeamActions.loadTeam),
      mergeMap((action) =>
        this.teamService.getById(action.id).pipe(
          map((data) => TeamActions.loadTeamSuccess({ team: data })),
          catchError((error) => of(TeamActions.loadTeamFailure({ error }))))
      ),
    );
  });

  createTeam$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeamActions.addTeam),
      mergeMap((action) =>
        this.teamService.create(action.team).pipe(
          withLatestFrom(this.store),
          switchMap(([data, storeState]) => [
            TeamActions.addTeamSuccess({ team: data }),
            TeamActions.loadTeams({ leagueId: action.team.league!.id, queryParams: storeState.teams.queryParamsMap[action.team.league!.id] })
          ]),
          catchError((error) => of(TeamActions.addTeamFailure({ error }))))
      ),
    );
  });

  updateTeam$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeamActions.upsertTeam),
      mergeMap((action) =>
        this.teamService.update(action.team).pipe(
          withLatestFrom(this.store),
          switchMap(([data, storeState]) => [
            TeamActions.upsertTeamSuccess({ team: data }),
            TeamActions.loadTeams({ leagueId: action.team.league!.id, queryParams: storeState.teams.queryParamsMap[action.team.league!.id] })
          ]),
          catchError((error) => of(TeamActions.upsertTeamFailure({ error }))))
      ),
    );
  });

  deleteTeam$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeamActions.deleteTeam),
      mergeMap((action) =>
        this.teamService.delete(action.teamId).pipe(
          withLatestFrom(this.store),
          switchMap(([, storeState]) => [
            TeamActions.deleteTeamSuccess(),
            TeamActions.loadTeams({ leagueId: action.leagueId, queryParams: storeState.teams.queryParamsMap[action.leagueId] })
          ]),
          catchError((error) => of(TeamActions.upsertTeamFailure({ error }))))
      ),
    );
  });


  constructor(
    private actions$: Actions,
    private store: Store<BasketStatsAppState>,
    private teamService: TeamService
  ) { }
}
