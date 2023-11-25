import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Team } from 'src/app/models/team';
import { Page } from 'src/app/shared/model/pageable';
import { QueryParams } from 'src/app/shared/model/query-params';
import * as TeamActions from './team.actions';

export const teamsFeatureKey = 'teams';

export interface TeamState extends EntityState<Team> {
  teamsPageMap: { [leagueId: number]: Page<Team> };
  queryParamsMap: { [leagueId: number]: QueryParams };
  error: any
}

export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>();

export const initialState: TeamState = adapter.getInitialState({
  teamsPageMap: {},
  queryParamsMap: {},
  error: null
});

export const reducer = createReducer(
  initialState,
  on(
    TeamActions.loadTeamSuccess,
    TeamActions.addTeamSuccess,
    (state, action) => adapter.addOne(action.team, state)
  ),
  on(TeamActions.upsertTeamSuccess,
    (state, action) => adapter.upsertOne(action.team, state)
  ),
  on(TeamActions.addTeams,
    (state, action) => adapter.addMany(action.teams, state)
  ),
  on(TeamActions.upsertTeams,
    (state, action) => adapter.upsertMany(action.teams, state)
  ),
  on(TeamActions.updateTeam,
    (state, action) => adapter.updateOne(action.team, state)
  ),
  on(TeamActions.updateTeams,
    (state, action) => adapter.updateMany(action.teams, state)
  ),
  on(TeamActions.deleteTeam,
    (state, action) => adapter.removeOne(action.teamId, state)
  ),
  on(TeamActions.deleteTeams,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(TeamActions.loadTeamsSuccess,
    (state, action) => {
      // state.teamsPageMap = {
      //   ...state.teamsPageMap,
      //   [action.leagueId]: action.teamsPage
      // };
      // state.queryParamsMap = {
      //   ...state.queryParamsMap,
      //   [action.leagueId]: action.queryParams
      // };
      return {
        ...state,
        teamsPageMap: {
          ...state.teamsPageMap,
          [action.leagueId]: action.teamsPage
        },
        queryParamsMap: {
          ...state.queryParamsMap,
          [action.leagueId]: action.queryParams
        }
      };
    }
  ),
  on(TeamActions.loadAllTeamsSuccess,
    (state, action) => adapter.setAll(action.teams, state)
  ),
  on(
    TeamActions.loadAllTeamsFailure,
    TeamActions.loadTeamsFailure,
    TeamActions.loadTeamFailure,
    TeamActions.addTeamFailure,
    TeamActions.upsertTeamFailure,
    TeamActions.deleteTeamFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(TeamActions.clearTeams,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
