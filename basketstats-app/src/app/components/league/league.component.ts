import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, last, mergeMap } from 'rxjs/operators';
import * as LeagueActions from 'src/app/components/league/state/league.actions';
import * as LeagueSelector from 'src/app/components/league/state/league.selectors';
import { SortDirection } from 'src/app/enums/sort-direction.enum';
import { League } from 'src/app/models/league.model';
import { BaseTableComponent } from 'src/app/shared/component/base-table/base-table.component';
import { ColumnType } from 'src/app/shared/enum/column-type';
import { FieldType } from 'src/app/shared/enum/field-type';
import { FormViewType } from 'src/app/shared/enum/form-view-type';
import { TableOperation } from 'src/app/shared/enum/table-operation';
import { FormConfig } from 'src/app/shared/model/form-config';
import { defaultQueryParams, QueryParams } from 'src/app/shared/model/query-params';
import { TableConfig } from 'src/app/shared/model/table-config';
import { BasketStatsAppState } from 'src/app/store';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  public formViewType = FormViewType;

  public queryParams: QueryParams = {
    ...defaultQueryParams,
    sort: {
      name: 'id',
      direction: SortDirection.ASC
    }
  };

  public leagueTableConfig: TableConfig = {
    headerText: 'Ligi',
    addButtonTooltip: 'Dodaj ligę',
    searchPlaceholder: 'np. Ekstraliga, Liga 1, Liga 2',
    tableColumns: [
      { name: 'name', type: ColumnType.STRING, translation: 'Nazwa' },
    ],
    pageSizeOptions: [10, 20, 40],
    tableOperations: [TableOperation.ADD, TableOperation.PREVIEW, TableOperation.EDIT, TableOperation.DELETE]
  };

  public leagueFormConfig: FormConfig = {
    formFields: [
      {
        name: 'name',
        type: FieldType.STRING,
        label: 'Nazwa',
        placeholder: 'Wpisz nazwę ligi...',
        validators: [Validators.required]
      }
    ],
    headerTextMap: new Map(
      [
        [FormViewType.ADD, 'Dodaj'],
        [FormViewType.EDIT, 'Edytuj'],
        [FormViewType.PREVIEW, 'Podgląd'],
      ]
    )
  } as FormConfig;

  public leaguesViewModel$: Observable<LeagueSelector.LeaguesViewModel>;
  public leagueRow$: Observable<League>;

  @ViewChild(BaseTableComponent) table!: BaseTableComponent<League>;

  constructor(
    private store: Store<BasketStatsAppState>,
    private actions: Actions
  ) { }

  ngOnInit(): void {
    this.loadLeagues();
    this.leaguesViewModel$ = this.store.pipe(select(LeagueSelector.selectLeaguesViewModel));
  }

  private loadLeagues(): void {
    this.store.dispatch(LeagueActions.loadLeagues({ queryParams: this.queryParams }));
  }

  private loadLeague(id: number): void {
    this.leagueRow$ = this.store.pipe(select(LeagueSelector.entityExistsInStore(id))).pipe(
      mergeMap((existsInStore: boolean) => {
        if (!existsInStore) {
          this.store.dispatch(LeagueActions.loadLeague({ id }));
        }

        return this.store.pipe(select(LeagueSelector.selectEntityById(id)));
      })
    );
  }

  public applyParamsAndFetch(queryParams: QueryParams): void {
    this.queryParams = queryParams;
    this.loadLeagues();
  }

  public formSubmit(league: League): void {
    if (league.id) {
      this.store.dispatch(LeagueActions.upsertLeague({ league }));
    } else {
      this.store.dispatch(LeagueActions.addLeague({ league }));
    }

    this.actions.pipe(
      ofType(LeagueActions.addLeagueSuccess),
      last(),
    ).subscribe(() => {
      this.loadLeagues();
    });
  }

  public openModal(id: number, formViewType?: FormViewType): void {
    this.loadLeague(id);

    this.leagueRow$.pipe(
      first((res: League) => !!res)
    ).subscribe((res: League) => {
      switch (formViewType) {
        case FormViewType.ADD:
        case FormViewType.PREVIEW:
        case FormViewType.EDIT:
          this.table.openFormModal(formViewType, res);
          break;
        default: {
          this.table.openConfirmDeleteModal(
            res.id,
            `Czy na pewno chcesz usunąć ligę o nazwie <strong>${res.name}</strong>?`
          );
        }
      }
    });
  }

  public delete(id: number): void {
    this.store.dispatch(LeagueActions.deleteLeague({ id }));
  }

}
