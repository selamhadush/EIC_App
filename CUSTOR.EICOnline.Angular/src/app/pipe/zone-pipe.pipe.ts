import { Pipe, PipeTransform } from '@angular/core';
import { ZoneModel } from '../model/address/Zone.model';
import { AddressService } from '../Services/Address/address.service';

@Pipe({
  name: 'zonePipe'
})
export class ZonePipePipe implements PipeTransform {
  zones: ZoneModel[] = [];

  constructor(private addressService: AddressService) {
    //  this.getAllZone();
  }

  transform(code: any, args?: any): any {
    console.log(code);
    return this.addressService.getAllZones()
      .subscribe(data => {
        this.zones = data;
        for (const zone of this.zones) {
          if (zone.ZoneId === code) {
            console.log(zone.DescriptionEnglish);
            return 'zana';

            // return zone.DescriptionEnglish;
          }
        }
        return null;
      },
        error => {
          console.log('Error');
        });
  }

  // getAllZone() {
  //   this.customerService.getAllZone()
  //     .subscribe(zones => {
  //       this.zones = zones;
  //     });
  // }
}