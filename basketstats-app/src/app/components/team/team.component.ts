import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, last, mergeMap } from 'rxjs/operators';
import * as LeagueActions from 'src/app/components/league/state/league.actions';
import * as LeagueSelector from 'src/app/components/league/state/league.selectors';
import * as TeamsActions from 'src/app/components/team/state/team.actions';
import * as TeamSelector from 'src/app/components/team/state/team.selectors';
import { SortDirection } from 'src/app/enums/sort-direction.enum';
import { League } from 'src/app/models/league.model';
import { Team } from 'src/app/models/team';
import { BaseTableComponent } from 'src/app/shared/component/base-table/base-table.component';
import { ColumnType } from 'src/app/shared/enum/column-type';
import { FieldType } from 'src/app/shared/enum/field-type';
import { FormViewType } from 'src/app/shared/enum/form-view-type';
import { TableOperation } from 'src/app/shared/enum/table-operation';
import { FormConfig } from 'src/app/shared/model/form-config';
import { defaultQueryParams, QueryParams } from 'src/app/shared/model/query-params';
import { TableConfig } from 'src/app/shared/model/table-config';
import { BasketStatsAppState } from 'src/app/store';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public formViewType = FormViewType;

  public queryParams: QueryParams = {
    ...defaultQueryParams,
    sort: {
      name: 'id',
      direction: SortDirection.ASC
    }
  };
  public queryParamsMap: Map<number, QueryParams>;

  public tableConfig: TableConfig = {
    addButtonTooltip: 'Dodaj drużynę',
    searchPlaceholder: 'np. Chicago Lions, Los Angeles Mountaineers',
    tableColumns: [
      { name: 'logo', type: ColumnType.IMAGE, translation: 'Logo' },
      { name: 'name', type: ColumnType.STRING, translation: 'Nazwa' },
    ],
    pageSizeOptions: [5, 10, 20, 40],
    tableOperations: [TableOperation.ADD, TableOperation.PREVIEW, TableOperation.EDIT, TableOperation.DELETE]
  };

  public formConfig: FormConfig = {
    formFields: [
      {
        name: 'league',
        type: FieldType.OBJECT,
        label: 'Liga',
        placeholder: 'Wubierz ligę...',
        validators: [Validators.required],
        selectOptions: {
          values: [],
          isAsync: true,
          viewField: 'name'
        }
      },
      {
        name: 'name',
        type: FieldType.STRING,
        label: 'Nazwa',
        placeholder: 'Wpisz nazwę drużyny...',
        validators: [Validators.required]
      },
      {
        name: 'imageFile',
        type: FieldType.IMAGE,
        label: 'Logo',
        placeholder: 'Wprowadź logo...'
      },
    ],
    headerTextMap: new Map(
      [
        [FormViewType.ADD, 'Dodaj'],
        [FormViewType.EDIT, 'Edytuj'],
        [FormViewType.PREVIEW, 'Podgląd'],
      ]
    )
  } as FormConfig;

  public leagues$: Observable<League[]>;
  public teamRow$: Observable<Team>;

  @ViewChildren(BaseTableComponent) tables!: QueryList<BaseTableComponent<League>>;

  constructor(
    private store: Store<BasketStatsAppState>,
    private actions: Actions,
    public teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loadLeagues();
    this.leagues$ = this.store.pipe(select(LeagueSelector.selectAllLeagues));
    this.setFormAsyncValues();
  }

  private loadLeagues(): void {
    this.store.dispatch(LeagueActions.loadAllLeagues());
  }

  private setFormAsyncValues(): void {
    const leagueFormFieldDefinition = this.formConfig.formFields.find(formField => formField.name === 'league');
    if (leagueFormFieldDefinition) {
      leagueFormFieldDefinition!.selectOptions!.values = this.leagues$;
    }
  }

  private loadTeam(id: number): void {
    this.teamRow$ = this.store.pipe(select(TeamSelector.entityExistsInStore(id))).pipe(
      mergeMap((existsInStore: boolean) => {
        if (!existsInStore) {
          this.store.dispatch(TeamsActions.loadTeam({ id }));
        }

        return this.store.pipe(select(TeamSelector.selectEntityById(id)));
      })
    );
  }

  public applyParamsAndFetch(leagueId: number, queryParams: QueryParams): void {
    this.loadTeamsForLeague(leagueId, queryParams);
  }

  private loadTeamsForLeague(leagueId: number, queryParams: QueryParams) {
    this.store.dispatch(TeamsActions.loadTeams({ leagueId, queryParams }));
  }

  private getTableByLeague(leagueId: number): BaseTableComponent<League> {
    return this.tables.find(table => +table.id === leagueId)!;
  }

  public formSubmit(team: Team): void {
    if (team.id) {
      this.store.dispatch(TeamsActions.upsertTeam({ team }));
    } else {
      this.store.dispatch(TeamsActions.addTeam({ team }));
    }

    this.actions.pipe(
      ofType(TeamsActions.addTeamSuccess),
      last(),
    ).subscribe(() => {
      this.loadLeagues();
    });
  }

  public openModal(leagueId: number, teamId: number, formViewType?: FormViewType): void {
    this.loadTeam(teamId);

    this.teamRow$.pipe(
      first((res: Team) => !!res)
    ).subscribe((res: Team) => {
      switch (formViewType) {
        case FormViewType.ADD:
        case FormViewType.PREVIEW:
        case FormViewType.EDIT:
          this.getTableByLeague(leagueId).openFormModal(formViewType, res);
          break;
        default: {
          this.getTableByLeague(leagueId).openConfirmDeleteModal(
            res.id,
            `Czy na pewno chcesz usunąć ligę o nazwie <strong>${res.name}</strong>?`
          );
        }
      }
    });
  }

  public navigateToPreview(): void {
    //TODO: navigate to preview site instead of open preview form modal
  }

  public delete(leagueId: number, teamId: number): void {
    this.store.dispatch(TeamsActions.deleteTeam({ leagueId, teamId }));
  }
}
