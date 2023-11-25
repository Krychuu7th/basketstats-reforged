import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldValue'
})
export class FieldValuePipe implements PipeTransform {

  transform(value: any, fieldPath: string): any {
    const fieldNames = fieldPath.split('.');
    if (fieldNames.length === 1) {
      return value[fieldPath] ?? value;
    }

    let resultValue = value;
    for (let fieldName of fieldNames) {
      resultValue = resultValue[fieldName];
    }

    return resultValue;
  }

}
