import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { TeamService } from 'src/app/components/team/team.service';
import { environment } from 'src/environments/environment';
import { ColumnType } from '../../enum/column-type';
import { FormViewType } from '../../enum/form-view-type';
import { ModificationViewType } from '../../enum/modification-view-type';
import { TableOperation } from '../../enum/table-operation';
import { BaseCrudResource } from '../../model/base-crud-resource.model';
import { FormConfig } from '../../model/form-config';
import { Page } from '../../model/pageable';
import { getCopyWithParamIfNotExists, getParamValue, QueryParams } from '../../model/query-params';
import { getCopyWithColumnIfNotExists, TableColumn, TableConfig } from '../../model/table-config';
import { BaseAddEditFormComponent } from '../base-add-edit-form/base-add-edit-form.component';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';


@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss']
})
export class BaseTableComponent<T extends BaseCrudResource> implements OnInit {
  @Input() id!: number;
  @Input()
  dataPage: Page<T>;
  @Input()
  queryParams: QueryParams;
  @Input()
  tableConfig: TableConfig;
  @Input()
  modificationViewType: ModificationViewType = ModificationViewType.MODAL;
  @Input()
  formConfig: FormConfig;

  @Output()
  queryParamsChange = new EventEmitter<QueryParams>();
  @Output()
  rowPreview = new EventEmitter<number>();
  @Output()
  rowEdit = new EventEmitter<number>();
  @Output()
  rowDelete = new EventEmitter<number>();
  @Output()
  formSubmit = new EventEmitter<T>();
  @Output()
  delete = new EventEmitter<number>();

  @ContentChild('imageContent') imageContent: TemplateRef<any>;

  public searchInputFormControl = new FormControl();
  public columnType = ColumnType;
  public formViewType = FormViewType;
  public tableOperation = TableOperation;
  public apiUrl = environment.api.url;
  private tableOptionOperations = [TableOperation.PREVIEW, TableOperation.EDIT];

  constructor(
    private modalService: NgbModal,
    public teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.tableConfig.tableColumns = getCopyWithColumnIfNotExists(
      this.tableConfig.tableColumns,
      {
        name: 'ordinal',
        type: ColumnType.ORDINAL
      },
      true);
    if (this.hasAnyTableOptionOperation()) {
      this.tableConfig.tableColumns = getCopyWithColumnIfNotExists(
        this.tableConfig.tableColumns,
        {
          name: 'options',
          type: ColumnType.OPTIONS
        });
    }
    this.searchInputFormControl.setValue(getParamValue(this.queryParams, 'searchLike'));
    this.searchInputFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((value: string) => this.applySearchInputChange(value))
    ).subscribe();
  }

  public openFormModal(formViewType: FormViewType, value?: T): void {
    if (!this.formConfig) {
      return;
    }
    const modalRef = this.modalService.open(BaseAddEditFormComponent, { centered: true });
    modalRef.componentInstance.formViewType = formViewType;
    modalRef.componentInstance.formConfig = this.formConfig;
    modalRef.componentInstance.dataObject = value;
    modalRef.result.then(
      (result: T) => {
        // when activeModal.close(**)
        this.formSubmit.emit(result);
      },
      (reason) => {
        // when activeModal.dismiss(**)
      }
    );
  }

  public openConfirmDeleteModal(objectId: number, body: string): void {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent, { centered: true });
    modalRef.componentInstance.body = body;
    modalRef.componentInstance.objectId = objectId;
    modalRef.result.then(
      (id: number) => {
        // when activeModal.close(**)
        this.delete.emit(id);
      },
      (reason) => {
        // when activeModal.dismiss(**)
      }
    );
  }

  public hasOperation(operation: TableOperation): boolean {
    return !!this.tableConfig.tableOperations?.includes(operation);
  }

  public hasTableColumnType(columnType: ColumnType): boolean {
    return this.tableConfig.tableColumns?.some(column => column.type === columnType);
  }

  private hasAnyTableOptionOperation(): boolean {
    return !!this.tableConfig.tableOperations?.some(operation => this.tableOptionOperations.includes(operation));
  }

  public applySearchInputChange(value: string): void {
    this.queryParams = getCopyWithParamIfNotExists(this.queryParams, { key: 'searchLike', value });
    this.queryParamsChange.emit(this.queryParams);
  }

  public applySortChange(sort: Sort): void {
    this.queryParams = {
      ...this.queryParams,
      sort: {
        name: sort.active,
        direction: sort.direction
      }
    };
    this.queryParamsChange.emit(this.queryParams);
  }

  public applyPageChange(pageEvent: PageEvent): void {
    this.queryParams = {
      ...this.queryParams,
      pagination: {
        page: pageEvent.pageIndex,
        size: pageEvent.pageSize
      }
    };
    this.queryParamsChange.emit(this.queryParams);
  }

  public clearSearchInput(): void {
    this.searchInputFormControl.reset();
  }

  public get tableColumns(): TableColumn[] {
    return this.tableConfig.tableColumns;
  }

  public get tableColumnNames(): string[] {
    return this.tableConfig.tableColumns.map(column => column.name);
  }

  public get headerText(): string {
    return this.tableConfig.headerText!;
  }

  public get addButtonTooltip(): string {
    return this.tableConfig.addButtonTooltip;
  }

  public get searchPlaceholder(): string {
    return this.tableConfig.searchPlaceholder;
  }

  public get sortColumnName(): string {
    return this.queryParams.sort?.name ?? 'id';
  }

  public get sortName(): string {
    return this.queryParams.sort?.direction ?? 'asc';
  }

  public get searchInputValue(): string {
    return this.searchInputFormControl.value;
  }

}
