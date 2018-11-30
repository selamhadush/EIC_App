import {Pipe, PipeTransform} from '@angular/core';
import {ServiceStepModel} from '../model/ServiceStep.model';
import {ServicesStepService} from '../Services/services-step.service';

@Pipe({
  name: 'serviceStepPipe'
})
export class ServiceStepPipePipe implements PipeTransform {
  allStep: ServiceStepModel[] = [];

  constructor(private servicesStepService: ServicesStepService) {
    this.getSteps();
  }

  transform(code: any, args?: any): any {
    for (const step of this.allStep) {
      if (step.ServiceStepId === code) {
        // console.log(code);
        // console.log(step.Description);
        return step.Name;
      }
    }
    return null;
  }

  getSteps() {
    this.servicesStepService.getAll()
      .subscribe(result => {
        // console.log(result)
        this.allStep = result;
      });
  }
}