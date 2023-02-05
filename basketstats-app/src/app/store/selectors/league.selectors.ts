import { createFeatureSelector, createSelector } from '@ngrx/store';
import { leagueFeatureKey, State } from '../reducers/league.reducer';

//Get feature from store
export const selectLeagueFeature = createFeatureSelector<State>(
    leagueFeatureKey
);

//Return page from feature
export const selectPage = createSelector(
    selectLeagueFeature,
    (state: State) => state.page
);

//Return leagues from feature
export const selectLeagues = createSelector(
    selectLeagueFeature,
    (state: State) => state.leagues
);

//Return isLoading flag from feature
export const selectIsLoading = createSelector(
    selectLeagueFeature,
    (state: State) => state.isLoading
);