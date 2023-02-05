import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromLeague from './reducers/league.reducer';


export interface BasketStatsAppState {

  [fromLeague.leagueFeatureKey]: fromLeague.State;
}

export const reducers: ActionReducerMap<BasketStatsAppState> = {

  [fromLeague.leagueFeatureKey]: fromLeague.reducer,
};


export const metaReducers: MetaReducer<BasketStatsAppState>[] = !environment.production ? [] : [];
