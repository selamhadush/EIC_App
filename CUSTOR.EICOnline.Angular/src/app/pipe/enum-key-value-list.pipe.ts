import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumKeyValueList'
})
export class EnumKeyValueListPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    const items: any[] = [];
    for (const key in value) {
      const isValueProperty = parseInt(key, 10) >= 0;
      if (!isValueProperty) {
        continue;
      }
      items.push({ key: key, value: value[key] });
    }
    return items;
  }
}