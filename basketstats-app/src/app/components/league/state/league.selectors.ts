import { createFeatureSelector, createSelector } from '@ngrx/store';
import { League } from 'src/app/models/league.model';
import { Page } from 'src/app/shared/model/pageable';

import * as LeagueReducer from './league.reducer';

export const selectLeaguesState = createFeatureSelector<LeagueReducer.LeagueState>(
    LeagueReducer.leaguesFeatureKey
);

export const selectAllLeagues = createSelector(
    selectLeaguesState,
    LeagueReducer.selectAll
);

export const selectAllEntities = createSelector(
    selectLeaguesState,
    LeagueReducer.selectEntities
);

export const selectLeaguesPage = createSelector(
    selectLeaguesState,
    (state: LeagueReducer.LeagueState) => state.leaguesPage
);

export interface LeaguesViewModel {
    leagues: League[],
    leaguesPage: Page<League>,
}

export const selectLeaguesViewModel = createSelector(
    selectAllLeagues,
    selectLeaguesPage,
    (leagues: League[], leaguesPage: Page<League>): LeaguesViewModel => {
        return {
            leagues,
            leaguesPage
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
    (entities): League => {
        return entities[id]!;
    }
);