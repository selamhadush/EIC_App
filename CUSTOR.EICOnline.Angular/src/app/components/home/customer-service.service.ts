import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ConfigurationService} from '../../../@custor/services/configuration.service';

import {ServiceModel} from '../../model/Service.model';
import {ServicePrerequisite} from '../../model/service-prerequisite';

@Injectable()
export class CustomerServicesService {
  constructor(private httpClient: HttpClient, private config: ConfigurationService) {
  }

  private readonly _servicesUrl: string = 'api/services/en';
  private readonly _serviceUrl: string = 'api/service/';
  private readonly _incentiveServiceUrl: string = 'api/incentiveServices/en';
  private readonly _presUrl: string = 'api/servicePrerequisiteByServiceId/';

  get servicesUrl() {
    return this.config.baseUrl + this._servicesUrl;
  }

  get incentiveServiceUrl() {
    return this.config.baseUrl + this._incentiveServiceUrl;
  }

  get presUrl() {
    return this.config.baseUrl + this._presUrl;
  }

  // Declarations
  serviceList: ServiceModel[] = [];
  service: ServiceModel = new ServiceModel();
  checkList: ServicePrerequisite = new ServicePrerequisite();
  checkLists: ServicePrerequisite[] = [];

  getServices(): Observable<any> {
    return this.httpClient.get<ServiceModel[]>(this.servicesUrl)
      .pipe(
        map(serviceList => {
          this.serviceList = serviceList;
          // console.log(serviceListPre);
        }),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  getServices2(): Observable<any> {
    return this.httpClient.get<ServiceModel[]>(this.servicesUrl)
      .pipe(
        map(serviceList => {
          this.serviceList = serviceList;
          return this.serviceList;
          // console.log(serviceListPre);
        }),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  getIncentiveServices(): Observable<any> {
    return this.httpClient.get<ServiceModel[]>(this.incentiveServiceUrl)
      .pipe(
        map(serviceList => {
          this.serviceList = serviceList;
          return this.serviceList;
          // console.log(serviceListPre);
        }),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  getService(id): Observable<any> {
    const endpointUrl = `${this._serviceUrl}/${id}`;
    return this.httpClient.get<ServiceModel>(endpointUrl).pipe(
      map(cust => {
        this.service = cust;
        return this.service;
      }),
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  getPrerequisites(id): Observable<any> {
    const endpointUrl = `${this.presUrl}/${id}`;
    // console.log (endpointUrl);
    return this.httpClient.get<ServicePrerequisite[]>(endpointUrl).pipe(
      map(pre => {
        this.checkLists = pre;
        console.log(this.checkList);
        return this.checkLists;
      }),
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    const serverError = error.json();
    let modelStateErrors = '';

    if (!serverError.type) {
      console.log(serverError);
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

    // return observableThrowError(applicationError || modelStateErrors || 'Server error');
    return applicationError || modelStateErrors || 'Server error';
  }
}
