import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { League } from 'src/app/models/league.model';
import { Page } from 'src/app/shared/model/pageable';
import { defaultQueryParams, QueryParams } from 'src/app/shared/model/query-params';
import * as LeagueActions from './league.actions';

export const leaguesFeatureKey = 'leagues';

export interface LeagueState extends EntityState<League> {
  leaguesPage: Page<League>;
  queryParams: QueryParams;
  error: any
}

export const adapter: EntityAdapter<League> = createEntityAdapter<League>();

export const initialState: LeagueState = adapter.getInitialState({
  leaguesPage: {} as Page<League>,
  queryParams: defaultQueryParams,
  error: null
});

export const reducer = createReducer(
  initialState,
  on(
    LeagueActions.loadLeagueSuccess,
    LeagueActions.addLeagueSuccess,
    (state, action) => adapter.addOne(action.league, state)
  ),
  on(LeagueActions.upsertLeagueSuccess,
    (state, action) => adapter.upsertOne(action.league, state)
  ),
  // on(LeagueActions.addLeagues,
  //   (state, action) => adapter.addMany(action.leagues, state)
  // ),
  // on(LeagueActions.upsertLeagues,
  //   (state, action) => adapter.upsertMany(action.leagues, state)
  // ),
  // on(LeagueActions.updateLeague,
  //   (state, action) => adapter.updateOne(action.league, state)
  // ),
  // on(LeagueActions.updateLeagues,
  //   (state, action) => adapter.updateMany(action.leagues, state)
  // ),
  on(LeagueActions.deleteLeague,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(LeagueActions.deleteLeagues,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(LeagueActions.loadLeaguesSuccess,
    (state, action) => {
      return {
        ...state,
        leaguesPage: action.leaguesPage,
        queryParams: action.queryParams,
      };
    }
  ),
  on(LeagueActions.loadAllLeaguesSuccess,
    (state, action) => adapter.setAll(action.leagues, state)
  ),
  on(
    LeagueActions.loadAllLeaguesFailure,
    LeagueActions.loadLeaguesFailure,
    LeagueActions.loadLeagueFailure,
    LeagueActions.addLeagueFailure,
    LeagueActions.upsertLeagueFailure,
    LeagueActions.deleteLeagueFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(LeagueActions.clearLeagues,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
