import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'fileSrc'
})
export class FileSrcPipe implements PipeTransform {

  transform(path: string, name: string): string {
    return `${environment.api.filesEndpoint}?path=${path.replaceAll('\\', '/')}&name=${name}`;
  }

}
