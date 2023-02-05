import { createReducer, on } from '@ngrx/store';
import * as leagueActions from '../actions/league.actions';

export const leagueFeatureKey = 'league';

export interface State {
  leagues: any,
  page: number,
  isLoading: boolean,
  error: any
}

export const initialState: State = {
  leagues:  null,
  page: 1,
  isLoading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(leagueActions.loadLeagues, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(leagueActions.loadLeaguesSuccess, (state, action) => {
    return {
      ...state,
      leagues: action.data,
      isLoading: false
    };
  }),
  on(leagueActions.loadLeaguesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false
    };
  }),
  on(leagueActions.nextLeaguePage, (state) => {
    return {
      ...state,
      page: state.page + 1
    };
  }),
  on(leagueActions.previousLeaguePage, (state) => {
    return {
      ...state,
      page: state.page > 0 ? state.page - 1 : 0
    };
  }),
  on(leagueActions.setLeaguePage, (state, action) => {
    return {
      ...state,
      page: action.page
    };
  })
);
