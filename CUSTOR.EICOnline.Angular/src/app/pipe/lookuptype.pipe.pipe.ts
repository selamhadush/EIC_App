import {Pipe, PipeTransform} from '@angular/core';
import {LookuptypesModel} from '../model/lookuptypes';
import {LookupTypeService} from '../Services/lookup-type.service';

@Pipe({
  name: 'lookupTypePipe'
})
export class LookuptypePipe implements PipeTransform {
  allLookuptype: LookuptypesModel[] = [];

  constructor(private lookupTypeService: LookupTypeService) {
    this.getLookupTypes();
  }

  transform(code: any, en: number, args?: any): any {
    for (const lookup of this.allLookuptype) {
      if (lookup.LookUpTypeId === code) {
        if (en === 1) {
          return lookup.DescriptionEnglish;
        } else {
          return lookup.Description;
        }
      }
    }
    return null;
  }

  getLookupTypes() {
    this.lookupTypeService.getAllLookup().subscribe(lookuptype => {
      this.allLookuptype = lookuptype;
    });
  }
}
