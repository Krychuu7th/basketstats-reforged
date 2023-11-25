import { Pipe, PipeTransform } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import * as fromTeamsActions from 'src/app/components/team/state/team.actions';
import * as TeamSelector from 'src/app/components/team/state/team.selectors';
import { BasketStatsAppState } from 'src/app/store';
import { QueryParams } from '../../model/query-params';

@Pipe({
  name: 'teamsByLeague'
})
export class TeamsByLeaguePipe implements PipeTransform {

  constructor(
    private store: Store<BasketStatsAppState>
  ) { }

  transform(leagueId: number, queryParams: QueryParams): Observable<TeamSelector.TeamsViewModel> {
    return this.store.pipe(select(TeamSelector.pageExistsInStore(leagueId))).pipe(
      mergeMap((existsInStore: boolean) => {
        if (!existsInStore) {
          this.store.dispatch(fromTeamsActions.loadTeams({ leagueId, queryParams }));
        }

        return this.store.pipe(select(TeamSelector.selectTeamsViewModel));
      })
    );
  }

}
