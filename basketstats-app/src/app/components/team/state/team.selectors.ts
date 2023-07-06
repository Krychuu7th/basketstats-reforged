import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Team } from 'src/app/models/team';
import { Page } from 'src/app/shared/model/pageable';
import { QueryParams } from 'src/app/shared/model/query-params';

import * as TeamReducer from './team.reducer';

export const selectTeamsState = createFeatureSelector<TeamReducer.TeamState>(
    TeamReducer.teamsFeatureKey
);

export const selectAllTeams = createSelector(
    selectTeamsState,
    TeamReducer.selectAll
);

export const selectAllEntities = createSelector(
    selectTeamsState,
    TeamReducer.selectEntities
);

export const selectTeamsPageMap = createSelector(
    selectTeamsState,
    (state: TeamReducer.TeamState) => state.teamsPageMap
);

export const selectQueryParamsMap = createSelector(
    selectTeamsState,
    (state: TeamReducer.TeamState) => state.queryParamsMap
);

export interface TeamsViewModel {
    teams: Team[],
    teamsPageMap: { [leagueId: number]: Page<Team> },
    queryParamsMap: { [leagueId: number]: QueryParams },
}

export const selectTeamsViewModel = createSelector(
    selectAllTeams,
    selectTeamsPageMap,
    selectQueryParamsMap,
    (teams: Team[], teamsPageMap: { [leagueId: number]: Page<Team> }, queryParamsMap: { [leagueId: number]: QueryParams }): TeamsViewModel => {
        return {
            teams,
            teamsPageMap,
            queryParamsMap
        }
    }
);

export const entityExistsInStore = (id: number) => createSelector(
    selectAllEntities,
    (entities): boolean => {
        return entities[id] != undefined;
    }
);

export const selectEntityById = (id: number) => createSelector(
    selectAllEntities,
    (entities): Team => {
        return entities[id]!;
    }
);

export const pageExistsInStore = (id: number) => createSelector(
    selectTeamsPageMap,
    (map: { [leagueId: number]: Page<Team> }): boolean => {
        return map[id] != undefined;
    }
);