import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ServicePrerequisite } from '../../../../model/service-prerequisite';
import { AppConfiguration } from '../../../../config/appconfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicePrerequisiteModel } from '../../../../model/service';
import { ErrorMessage } from '@custor/services/errMessageService';
import { BaseService } from '../../../../Services/Base.service';

@Injectable()
export class ServicePrerequisiteService extends BaseService<ServicePrerequisiteModel> {
  constructor(public httpClient: HttpClient,
    public config: AppConfiguration, public errMsg: ErrorMessage) {
    super(httpClient, config.urls.url('serviceprerequisite'), errMsg);
  }

  servicePrerequisiteList: ServicePrerequisite[] = [];
  servicePrerequisite: ServicePrerequisite = new ServicePrerequisite();
  serviceList: ServicePrerequisiteModel[];

  getServicePrerequisites(): Observable<ServicePrerequisite[]> {
    return this.httpClient.get<ServicePrerequisite[]>(this.config.urls.url('serviceprerequisites')).pipe(
      map(servicePrerequisiteList => this.servicePrerequisiteList = servicePrerequisiteList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getServicePrerequisiteForExistance(descEng, serviceId) {
    return this.httpClient.get<ServicePrerequisite>(this.config.urls.url('serviceprerequisite', descEng, serviceId)).pipe(
      map(servicePrereq => {
        this.servicePrerequisite = servicePrereq;
        return this.servicePrerequisite;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getServicePrerequisite(id): Observable<ServicePrerequisite> {
    return this.httpClient.get<ServicePrerequisite>(this.config.urls.url('serviceprerequisite', id)).pipe(
      map(servicePrereq => {
        this.servicePrerequisite = servicePrereq;
        return this.servicePrerequisite;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getService(): Observable<ServicePrerequisiteModel[]> {
    return this.httpClient.get<ServicePrerequisiteModel[]>(this.config.urls.url('services')).pipe(
      map(serviceList => this.serviceList = serviceList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  saveServicePrerequisite(servicePrerequisite: ServicePrerequisite): Observable<ServicePrerequisite> {
    console.log(servicePrerequisite.ServicePrerequisiteId,
      servicePrerequisite.Description,
      servicePrerequisite.DescriptionEnglish,
      servicePrerequisite.ServiceId,
      servicePrerequisite.IsActive
    );
    return this.httpClient.post<ServicePrerequisite>(this.config.urls.url('serviceprerequisite'), servicePrerequisite).pipe(
      map(ServicePrereq => {
        this.servicePrerequisite = ServicePrereq;
        return this.servicePrerequisite;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  deleteServicePrerequisite(servicePrerequisite: ServicePrerequisite): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('serviceprerequisite', servicePrerequisite.ServicePrerequisiteId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError));
  }

  servicePrerequisiteByServiceId(serviceId: any): Observable<ServicePrerequisite[]> {
    return this.httpClient.get<ServicePrerequisite[]>
      (this.config.urls.url('servicePrerequisiteByServiceId', serviceId)).pipe(
        map(result => {
          return result;
        }),
        catchError(this.errMsg.parseObservableResponseError));
  }
}
