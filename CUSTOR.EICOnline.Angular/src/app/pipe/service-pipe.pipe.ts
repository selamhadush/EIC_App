import {Pipe, PipeTransform} from '@angular/core';
import {ServiceModel} from '../model/Service.model';
import {ServiceService} from '../Services/service.service';

@Pipe({
  name: 'servicePipe'
})
export class ServicePipePipe implements PipeTransform {


  allServices: ServiceModel[] = [];

  constructor(private serviceService: ServiceService) {
    this.getSteps();
  }

  transform(code: any, args?: any): any {
    for (const services of this.allServices) {
      if (services.ServiceId === code) {
        console.log(code);
        console.log(services.DisplayNameEnglish);
        return services.DisplayNameEnglish;
      }
    }
    return null;
  }

  getSteps() {
    this.serviceService.getAll()
      .subscribe(result => {
        // console.log(result)
        this.allServices = result;
      });
  }
}
