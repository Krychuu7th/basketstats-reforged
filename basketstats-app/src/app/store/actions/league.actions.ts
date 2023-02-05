import { createAction, props } from '@ngrx/store';

export const loadLeagues = createAction(
  '[League] Load Leagues'
);

export const loadLeaguesSuccess = createAction(
  '[League] Load Leagues Success',
  props<{ data: any }>()
);

export const loadLeaguesFailure = createAction(
  '[League] Load Leagues Failure',
  props<{ error: any }>()
);

//Test action
export const nextLeaguePage = createAction(
  '[League] Next League Page'
);

//Test action
export const previousLeaguePage = createAction(
  '[League] Previous League Page'
);

//Test action
export const setLeaguePage = createAction(
  '[League] Set League Page',
  props<{ page: number }>()
);