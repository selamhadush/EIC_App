import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {
  transform(value: any, limit: number, args?: any): any {
    if (value.length > limit) {
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }
}