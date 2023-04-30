import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { League } from 'src/app/models/league.model';
import { QueryParams } from 'src/app/models/shared/query-params';

export const loadLeagues = createAction(
  '[League/API] Load Leagues', 
  props<{ queryParams: QueryParams }>()
);

export const loadAllLeagues = createAction(
  '[League/API] Load All Leagues'
);

export const loadLeaguesSuccess = createAction(
  '[League Effect] Load Leagues Success', 
  props<{ leagues: League[] }>()
);

export const loadLeaguesFailure = createAction(
  '[League Effect] Load Leagues Failure', 
  props<{ error: any }>()
);

export const addLeague = createAction(
  '[League/API] Add League',
  props<{ league: League }>()
);

export const upsertLeague = createAction(
  '[League/API] Upsert League',
  props<{ league: League }>()
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
  props<{ id: string }>()
);

export const deleteLeagues = createAction(
  '[League/API] Delete Leagues',
  props<{ ids: string[] }>()
);

export const clearLeagues = createAction(
  '[League/API] Clear Leagues'
);
