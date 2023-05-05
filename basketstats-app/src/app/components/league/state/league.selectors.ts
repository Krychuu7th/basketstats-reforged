import { createFeatureSelector, createSelector } from '@ngrx/store';
import { League } from 'src/app/models/league.model';
import { Page } from 'src/app/shared/model/pageable';

import * as LeagueReducer from './league.reducer';

export const selectLeaguesState = createFeatureSelector<LeagueReducer.State>(
    LeagueReducer.leaguesFeatureKey
);

export const selectAllLeagues = createSelector(
    selectLeaguesState,
    LeagueReducer.selectAll
);

export const selectLeaguesPage = createSelector(
    selectLeaguesState,
    (state: LeagueReducer.State) => state.leaguesPage
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