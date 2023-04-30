import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
// import * as fromLeague from './league/league.reducer';
import * as fromLeague from '../components/league/state/league.reducer';


export interface BasketStatsAppState {

  // [fromLeague.leagueFeatureKey]: fromLeague.LeagueState;
  [fromLeague.leaguesFeatureKey]: fromLeague.State;
  
  router:  fromRouter.RouterReducerState;
  
}

export const reducers: ActionReducerMap<BasketStatsAppState> = {

  // [fromLeague.leagueFeatureKey]: fromLeague.reducer,
  [fromLeague.leaguesFeatureKey]: fromLeague.reducer,

  router: fromRouter.routerReducer

  
};


export const metaReducers: MetaReducer<BasketStatsAppState>[] = !environment.production ? [] : [];
