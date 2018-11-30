import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../../../../config/appconfig';
import {ServiceTariffModel} from '../../../../model/servicetariff';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import {TariffModel} from '../../../../model/tariff';
import {ServicePrerequisiteModel} from '../../../../model/service';
import {ErrorMessage} from '../../../../../@custor/services/errMessageService';

@Injectable()
export class ServicetariffService {
  serviceTariffModel: ServiceTariffModel = new ServiceTariffModel();
  serviceTariffList: ServiceTariffModel[] = [];
  tariffModels: TariffModel[] = [];
  servicePrerequisiteModels: ServicePrerequisiteModel[] = [];

  constructor(private httpClient: HttpClient,
              private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  /*getServicePrerequisiteForExistance(descEng,serviceId): Observable<ServicePrerequisiteModel> {
    return this.httpClient.get<ServicePrerequisiteModel>(this.config.urls.url('service', descEng,serviceId))
      .map(servicePrereq => {
        this.servicePrerequisiteModel = servicePrereq;
        return this.servicePrerequisiteModel;
      })
      .catch(this.errMsg.parseObservableResponseError);
  }*/
  getTariff(): Observable<TariffModel[]> {
    return this.httpClient.get<TariffModel[]>(this.config.urls.url('tariffs')).pipe(
      map(tariffdata => {
        this.tariffModels = tariffdata;
        return this.tariffModels;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  getService(): Observable<ServicePrerequisiteModel[]> {
    return this.httpClient.get<ServicePrerequisiteModel[]>(this.config.urls.url('services')).pipe(
      map(serviceList => {
        this.servicePrerequisiteModels = serviceList;
        return this.servicePrerequisiteModels;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  /* getService(): Observable<ServicePrerequisiteModel[]> {
     return this.httpClient.get<ServicePrerequisiteModel[]>(this.config.urls.url('services')).pipe(
       map(servicePrereq => {
         this.servicePrerequisiteModels = servicePrereq;
         return this.servicePrerequisiteModels;
       }),
       catchError(this.errMsg.parseObservableResponseError),);
   }*/
  getServiceTariff(id): Observable<ServiceTariffModel[]> {
    return this.httpClient.get<ServiceTariffModel[]>(this.config.urls.url('servicetariff', id)).pipe(
      map(servicePrereq => {
        this.serviceTariffList = servicePrereq;
        return this.serviceTariffList;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  getServiceTariffs(): Observable<ServiceTariffModel[]> {
    return this.httpClient.get<ServiceTariffModel[]>(this.config.urls.url('servicetariffs')).pipe(
      map(serviceTariffsList => this.serviceTariffList = serviceTariffsList),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  saveServiceTariff(serviceTariffModel: ServiceTariffModel): Observable<ServiceTariffModel> {
    console.log(serviceTariffModel.ServiceId,
      serviceTariffModel.TariffId
    );
    return this.httpClient.post<ServiceTariffModel>(this.config.urls.url('servicetariff'), serviceTariffModel).pipe(
      map(ServicePrereq => {
        this.serviceTariffModel = ServicePrereq;
        return this.serviceTariffModel;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  deleteServiceTariff(serviceTariffModel: ServiceTariffModel): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('servicetariff', serviceTariffModel.ServiceTariffId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError),);
  }
}