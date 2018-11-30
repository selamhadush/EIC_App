import {Pipe, PipeTransform} from '@angular/core';
import {RegionModel} from '../model/address/Region.model';
import {AddressService} from '../Services/Address/address.service';

@Pipe({
  name: 'regionPipe'
})
export class RegionPipePipe implements PipeTransform {
  allRegion: RegionModel[] = [];

  constructor(private addressService: AddressService) {
    this.getRegion();
  }

  transform(code: any, args?: any): any {
    for (const region of this.allRegion) {
      if (region.RegionId === code) {
        console.log(code);
        console.log(region.RegionId);
        console.log(region.DescriptionEnglish);
        return region.DescriptionEnglish;
      }
    }
    return null;
  }

  getRegion() {
    this.addressService.getRegions().subscribe(regions => {
      this.allRegion = regions;
    });
  }
}