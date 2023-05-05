import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { League } from 'src/app/models/league.model';
import { Page } from 'src/app/shared/model/pageable';
import * as LeagueActions from './league.actions';

export const leaguesFeatureKey = 'leagues';

export interface State extends EntityState<League> {
  leaguesPage: Page<League>;
  error: any
}

export const adapter: EntityAdapter<League> = createEntityAdapter<League>();

export const initialState: State = adapter.getInitialState({
  leaguesPage: null,
  error: null
});

export const reducer = createReducer(
  initialState,
  on(LeagueActions.addLeague,
    (state, action) => adapter.addOne(action.league, state)
  ),
  on(LeagueActions.upsertLeague,
    (state, action) => adapter.upsertOne(action.league, state)
  ),
  on(LeagueActions.addLeagues,
    (state, action) => adapter.addMany(action.leagues, state)
  ),
  on(LeagueActions.upsertLeagues,
    (state, action) => adapter.upsertMany(action.leagues, state)
  ),
  on(LeagueActions.updateLeague,
    (state, action) => adapter.updateOne(action.league, state)
  ),
  on(LeagueActions.updateLeagues,
    (state, action) => adapter.updateMany(action.leagues, state)
  ),
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
        leaguesPage: action.leaguesPage
      };
    }
  ),
  on(LeagueActions.loadLeaguesFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(LeagueActions.loadAllLeaguesSuccess,
    (state, action) => adapter.setAll(action.leagues, state)
  ),
  on(LeagueActions.loadAllLeaguesFailure,
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
