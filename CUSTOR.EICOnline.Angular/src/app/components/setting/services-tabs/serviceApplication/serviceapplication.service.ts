import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ErrorMessage} from '../../../../../@custor/services/errMessageService';
import {AppConfiguration} from '../../../../config/appconfig';
import {catchError, map} from 'rxjs/operators';
import {ServiceApplicationModel} from '../../../../model/ServiceApplication.model';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../../../../Services/Base.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceapplicationService extends BaseService<ServiceApplicationModel> {
  serviceApplicationModel: ServiceApplicationModel = new ServiceApplicationModel();
  serviceApplicationModelList: ServiceApplicationModel[] = [];

  constructor(public httpClient: HttpClient,
              public config: AppConfiguration, public errMsg: ErrorMessage) {
    super(httpClient, config.urls.url('ServiceApplications'), errMsg);
  }

  // serviceListPre: ServiceModel[];

  getServiceAppliactions(): Observable<ServiceApplicationModel[]> {
    return this.httpClient.get<ServiceApplicationModel[]>(this.config.urls.url('serviceapplications')).pipe(
      map(serviceApp => this.serviceApplicationModelList = serviceApp),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getServiceAppliaction(id): Observable<ServiceApplicationModel> {
    return this.httpClient.get<ServiceApplicationModel>(this.config.urls.url('serviceapplication', id)).pipe(
      map(servicePrereq => {
        this.serviceApplicationModel = servicePrereq;
        return this.serviceApplicationModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getServiceApplicationsByInvestorId(id): Observable<ServiceApplicationModel[]> {
    return this.httpClient.get<ServiceApplicationModel>(this.config.urls.url('ServiceApplicationsByInvestorId', id)).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getServiceApplicationsByOfficerId(id): Observable<ServiceApplicationModel[]> {
    return this.httpClient.get<ServiceApplicationModel>(this.config.urls.url('ServiceApplicationsByOfficerId', id)).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  finalForApprovalServiceApplications(id): Observable<ServiceApplicationModel[]> {
    return this.httpClient.get<ServiceApplicationModel>(this.config.urls.url('finalForApproval', id)).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  changeApplicationStatus(resource, id) {
    return this.httpClient.post(this.config.urls.url('ChangeApplicationStatus', id), resource).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  applicationStart(resource) {
    return this.httpClient.post(this.config.urls.url('ApplicationStart'), resource).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }
}
