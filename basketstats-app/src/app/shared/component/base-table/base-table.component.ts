import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { BaseCrudResource } from '../../model/base-crud-resource.model';
import { Page } from '../../model/pageable';
import { QueryParams } from '../../model/query-params';
import { TableColumn, TableConfig } from '../../model/table-config';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss']
})
export class BaseTableComponent<T extends BaseCrudResource<T>> implements OnInit {

  @Input()
  dataPage: Page<T>;
  @Input()
  queryParams: QueryParams;
  @Input()
  tableConfig: TableConfig;

  @Output()
  searched = new EventEmitter<string>();

  public searchInputFormControl = new FormControl();

  constructor(
  ) { }

  ngOnInit(): void {
    this.searchInputFormControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((value: string) => this.searched.emit(value));
  }

  public add(): void {

  }

  public get tableColumns(): TableColumn[] {
    return this.tableConfig.tableColumns;
  }

  public get tableColumnNames(): string[] {
    return this.tableConfig.tableColumns.map(column => column.name);
  }

  public get headerText(): string {
    return this.tableConfig.headerText;
  }

  public get addButtonTooltip(): string {
    return this.tableConfig.addButtonTooltip;
  }


  public get searchPlaceholder(): string {
    return this.tableConfig.searchPlaceholder;
  }

}
