import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableIndex'
})
export class TableIndexPipe implements PipeTransform {

  transform(rowIndex: number, pageNumber: number, pageSize: number): unknown {
    return (rowIndex + (pageNumber * pageSize) + 1);
  }

}
