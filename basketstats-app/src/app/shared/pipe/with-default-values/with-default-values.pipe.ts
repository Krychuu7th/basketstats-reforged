import { Pipe, PipeTransform } from '@angular/core';
import { FormConfig } from '../../model/form-config';

@Pipe({
  name: 'withDefaultValues'
})
export class WithDefaultValuesPipe implements PipeTransform {

  transform(config: FormConfig, defaultValue: any): FormConfig {
    return { ...config, defaultValue } as FormConfig;
  }

}
