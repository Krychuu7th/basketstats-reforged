import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EffectsModule } from '@ngrx/effects';
import { BaseTableComponent } from './component/base-table/base-table.component';
import { FieldValuePipe } from './pipe/field-value.pipe';



@NgModule({
  declarations: [
    BaseTableComponent,
    FieldValuePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatSortModule,
    MatMenuModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTabsModule,
    MatRippleModule,
    MatSelectModule,
    EffectsModule.forFeature([])
  ],
  exports: [
    BaseTableComponent,
    FieldValuePipe
  ]
})
export class SharedModule { }
