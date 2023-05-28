import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { League } from 'src/app/models/league.model';
import { Page } from 'src/app/shared/model/pageable';
import { QueryParams } from 'src/app/shared/model/query-params';

export const loadLeagues = createAction(
  '[League/API] Load Leagues',
  props<{ queryParams: QueryParams }>()
);

export const loadAllLeagues = createAction(
  '[League/API] Load All Leagues'
);

export const loadLeaguesSuccess = createAction(
  '[League Effect] Load Leagues Success',
  props<{
    leaguesPage: Page<League>,
    queryParams: QueryParams
  }>()
);

export const loadLeaguesFailure = createAction(
  '[League Effect] Load Leagues Failure',
  props<{ error: any }>()
);

export const loadAllLeaguesSuccess = createAction(
  '[League Effect] Load All Leagues Success',
  props<{ leagues: League[] }>()
);

export const loadAllLeaguesFailure = createAction(
  '[League Effect] Load All Leagues Failure',
  props<{ error: any }>()
);

export const loadLeague = createAction(
  '[League/API] Load League',
  props<{ id: number }>()
);

export const loadLeagueSuccess = createAction(
  '[League Effect] Load League Success',
  props<{ league: League }>()
);

export const loadLeagueFailure = createAction(
  '[League Effect] Load League Failure',
  props<{ error: any }>()
);

export const addLeague = createAction(
  '[League/API] Add League',
  props<{ league: League }>()
);

export const addLeagueSuccess = createAction(
  '[League Effect] Add League Success',
  props<{ league: League }>()
);

export const addLeagueFailure = createAction(
  '[League Effect] Add League Failure',
  props<{ error: any }>()
);

export const upsertLeague = createAction(
  '[League/API] Upsert League',
  props<{ league: League }>()
);

export const upsertLeagueSuccess = createAction(
  '[League Effect] Upsert League Success',
  props<{ league: League }>()
);

export const upsertLeagueFailure = createAction(
  '[League Effect] Upsert League Failure',
  props<{ error: any }>()
);

export const addLeagues = createAction(
  '[League/API] Add Leagues',
  props<{ leagues: League[] }>()
);

export const upsertLeagues = createAction(
  '[League/API] Upsert Leagues',
  props<{ leagues: League[] }>()
);

export const updateLeague = createAction(
  '[League/API] Update League',
  props<{ league: Update<League> }>()
);

export const updateLeagues = createAction(
  '[League/API] Update Leagues',
  props<{ leagues: Update<League>[] }>()
);

export const deleteLeague = createAction(
  '[League/API] Delete League',
  props<{ id: number }>()
);

export const deleteLeagueSuccess = createAction(
  '[League Effect] Delete League Success'
);

export const deleteLeagueFailure = createAction(
  '[League Effect] Delete League Failure',
  props<{ error: any }>()
);

export const deleteLeagues = createAction(
  '[League/API] Delete Leagues',
  props<{ ids: number[] }>()
);

export const clearLeagues = createAction(
  '[League/API] Clear Leagues'
);
