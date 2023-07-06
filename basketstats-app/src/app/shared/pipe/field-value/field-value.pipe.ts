import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldValue'
})
export class FieldValuePipe implements PipeTransform {

  transform(value: any, columneName: string): any {
    return columneName ? value[columneName] : value;
  }

}
