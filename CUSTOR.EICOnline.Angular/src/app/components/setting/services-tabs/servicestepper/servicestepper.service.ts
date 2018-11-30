import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfiguration } from '../../../../config/appconfig';
import { ErrorMessage } from '../../../../../@custor/services/errMessageService';
import { ServiceStepModel } from '../../../../model/ServiceStep.model';
import { ServiceModel } from '../../../../model/Service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicestepperService {
  constructor(public httpClient: HttpClient,
    public config: AppConfiguration, public errMsg: ErrorMessage) {
    // super(httpClient, config.urls.url('servicestepper'), errMsg);
  }

  serviceStepModelList: ServiceStepModel[] = [];
  serviceStepModel: ServiceStepModel = new ServiceStepModel();
  serviceList: ServiceModel[];

  getServiceSteps(): Observable<ServiceStepModel[]> {
    return this.httpClient.get<ServiceStepModel[]>(this.config.urls.url('servicesteppers')).pipe(
      map(serviceStepModelList => this.serviceStepModelList = serviceStepModelList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getServiceStep(id): Observable<ServiceStepModel> {
    return this.httpClient.get<ServiceStepModel>(this.config.urls.url('servicestepper', id)).pipe(
      map(servicePrereq => {
        this.serviceStepModel = servicePrereq;
        return this.serviceStepModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getService(): Observable<ServiceModel[]> {
    return this.httpClient.get<ServiceModel[]>(this.config.urls.url('services')).pipe(
      map(serviceList => this.serviceList = serviceList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  saveServiceStep(serviceStepModel: ServiceStepModel): Observable<ServiceStepModel> {
    console.log(serviceStepModel.ServiceStepId,
      serviceStepModel.NameEnglish,
      serviceStepModel.Name,
      serviceStepModel.ServiceId,
      serviceStepModel.IsActive
    );
    return this.httpClient.post<ServiceStepModel>(this.config.urls.url('servicestepper'), serviceStepModel).pipe(
      map(ServicePrereq => {
        this.serviceStepModel = ServicePrereq;
        return this.serviceStepModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  deleteServiceStep(serviceStepModel: ServiceStepModel): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('servicestepper', serviceStepModel.ServiceStepId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError), );
  }
}