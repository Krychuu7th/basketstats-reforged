import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromLeagueActions from 'src/app/components/league/state/league.actions';
import * as LeagueSelector from 'src/app/components/league/state/league.selectors';
import { SortDirection } from 'src/app/enums/sort-direction.enum';
import { ColumnType } from 'src/app/shared/enum/column-type';
import { defaultQueryParams, QueryParams } from 'src/app/shared/model/query-params';
import { TableConfig } from 'src/app/shared/model/table-config';
import { BasketStatsAppState } from 'src/app/store';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  public leagueTableConfig: TableConfig = {
    headerText: 'Ligi',
    addButtonTooltip: 'Dodaj ligę',
    searchPlaceholder: 'np. Ekstraliga, Liga 1, Liga 2',
    tableColumns: [
      { name: 'id', type: ColumnType.NUMBER, translation: '#' },
      { name: 'name', type: ColumnType.STRING, translation: 'Nazwa' },
    ],
    pageSizeOptions: [10, 20, 40]
  };
  public queryParams: QueryParams = {
    ...defaultQueryParams,
    sort: {
      name: 'id',
      direction: SortDirection.ASC
    }
  };

  public leaguesViewModel$: Observable<LeagueSelector.LeaguesViewModel>;

  constructor(
    private store: Store<BasketStatsAppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromLeagueActions.loadLeagues({ queryParams: this.queryParams }));
    this.leaguesViewModel$ = this.store.pipe(select(LeagueSelector.selectLeaguesViewModel));

  }

  applySearchFilter(value: string): void {
    this.queryParams = {
      ...this.queryParams,
      params: [...this.queryParams.params, { key: 'nameLike', value }]
    }
    console.log(value);
  }

}
