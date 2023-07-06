import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducerMap, MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromLeague from '../components/league/state/league.reducer';
import * as fromTeam from '../components/team/state/team.reducer';


export interface BasketStatsAppState {

  [fromLeague.leaguesFeatureKey]: fromLeague.LeagueState;
  [fromTeam.teamsFeatureKey]: fromTeam.TeamState;

  router: fromRouter.RouterReducerState;

}

export const reducers: ActionReducerMap<BasketStatsAppState> = {

  [fromLeague.leaguesFeatureKey]: fromLeague.reducer,
  [fromTeam.teamsFeatureKey]: fromTeam.reducer,

  router: fromRouter.routerReducer


};


export const metaReducers: MetaReducer<BasketStatsAppState>[] = !environment.production ? [] : [];
