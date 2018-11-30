import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AppConfiguration} from '../../../../config/appconfig';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServicePrerequisiteModel} from '../../../../model/service';
import {ErrorMessage} from '../../../../../@custor/services/errMessageService';

@Injectable()
export class ServicesService {
  servicesList: ServicePrerequisiteModel[] = [];
  servicePrerequisiteModel: ServicePrerequisiteModel = new ServicePrerequisiteModel();
  serviceList: ServicePrerequisiteModel[];

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
  getService(id): Observable<ServicePrerequisiteModel> {
    return this.httpClient.get<ServicePrerequisiteModel>(this.config.urls.url('service', id)).pipe(
      map(servicePrereq => {
        this.servicePrerequisiteModel = servicePrereq;
        return this.servicePrerequisiteModel;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  getServices(): Observable<ServicePrerequisiteModel[]> {
    return this.httpClient.get<ServicePrerequisiteModel[]>(this.config.urls.url('services')).pipe(
      map(serviceList => this.serviceList = serviceList,
        //console.log(this.serviceList)
      ),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  saveService(servicePrerequisiteModel: ServicePrerequisiteModel): Observable<ServicePrerequisiteModel> {
    console.log(servicePrerequisiteModel.ServiceId,
      servicePrerequisiteModel.Name,
      servicePrerequisiteModel.DisplayName,
      servicePrerequisiteModel.NameEnglish,
      servicePrerequisiteModel.DisplayNameEnglish,
      servicePrerequisiteModel.IsActive
    );
    return this.httpClient.post<ServicePrerequisiteModel>(this.config.urls.url('service'), servicePrerequisiteModel).pipe(
      map(ServicePrereq => {
        this.servicePrerequisiteModel = ServicePrereq;
        return this.servicePrerequisiteModel;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  deleteService(servicePrerequisiteModel: ServicePrerequisiteModel): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('service', servicePrerequisiteModel.ServiceId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError),);
  }
}
