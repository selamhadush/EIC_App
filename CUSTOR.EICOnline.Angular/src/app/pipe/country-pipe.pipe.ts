import {Pipe, PipeTransform} from '@angular/core';
import {NationalityModel} from '../model/address/NationalityModel';
import {AddressService} from '../Services/Address/address.service';

@Pipe({
  name: 'countryPipe'
})
export class CountryPipe implements PipeTransform {
  allCountry: NationalityModel[] = [];

  constructor(private addressService: AddressService) {
    this.getNations();
  }

  transform(code: any, en: number, args?: any): any {
    for (const country of this.allCountry) {
      if (country.id === code) {
        // console.log(country.descriptionEnglish);
        if (en === 1) {
          return country.descriptionEnglish;
        } else {
          return country.description;
        }
      }
    }
    return null;
  }

  getNations() {
    this.addressService.getNationality().subscribe(country => {
      this.allCountry = country;
      // console.log(country);
    });
  }
}