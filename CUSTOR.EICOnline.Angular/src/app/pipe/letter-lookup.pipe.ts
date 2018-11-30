import {Pipe, PipeTransform} from '@angular/core';
import {LookupsModel} from '../model/lookups';
import {LookUpService} from '../Services/look-up.service';

@Pipe({
  name: 'letterlookupPipe'
})
export class LetterLookupPipe implements PipeTransform {
  allLookup: LookupsModel[] = [];

  constructor(private lookUpService: LookUpService) {
    this.getLookups();
  }

  transform(code: any, en: number, args?: any): any {
    for (const lookup of this.allLookup) {
      if (lookup.LookupId === code) {
        // console.log(code);
        // console.log(en);
        if (en === 1) {
          return lookup.English;
        } else {
          return lookup.Amharic;
        }
      }
    }
    return null;
  }

  getLookups() {

    this.lookUpService.getLookupByParentId(22).subscribe(result => {
      console.log(result);
      this.allLookup = result;
    });
  }
}
