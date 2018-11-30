import {WoredaModel} from '../model/address/Woreda.model';
import {Pipe, PipeTransform} from '@angular/core';
import {AddressService} from '../Services/Address/address.service';

@Pipe({
  name: 'woredaPipe'
})
export class WoredaPipePipe implements PipeTransform {
//   ngOnInit(): void {
//     // this.getAllWoreda();
//   }
//
//   constructor(private  addressService: AddressService) {
//     // this.getAllWoreda();
//   }
//
//   transform(code: any): any {
//     return this.addressService.getAllWoredas().subscribe(
//       data => {
//         this.woredas = data;
//         for (const wereda of this.woredas) {
//           if (wereda.WoredaId === code) {
//             // console.log(wereda);
//             return wereda.DescriptionEnglish;
//           }
//         }
//         return null;
//       },
//       error => {
//         console.log('Error');
//       });
//   }
//
//
//
// }

  allWoredas: WoredaModel[] = [];

  constructor(private addressService: AddressService) {
    this.getWoredas();
  }

  transform(code: any, args?: any): any {
    console.log(code);
    for (const woreda of this.allWoredas) {
      if (woreda.WoredaId === code) {
        console.log(code);
        console.log(woreda.Description);
        console.log(woreda.DescriptionEnglish);
        return woreda.DescriptionEnglish;
      }
    }
    return null;
  }

  getWoredas() {
    this.addressService.getAllWoredas().subscribe(result => {
      this.allWoredas = result;
    });
  }
}