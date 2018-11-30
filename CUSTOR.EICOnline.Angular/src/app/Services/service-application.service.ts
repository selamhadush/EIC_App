import {Injectable} from '@angular/core';
import {BaseService} from './Base.service';
import {ServiceApplicationModel} from '../model/ServiceApplication.model';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {ErrorMessage} from '../../@custor/services/errMessageService';
import {catchError} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {ServiceGroupModel} from '../model/ServiceGroup.Model';

@Injectable({
  providedIn: 'root'
})

export class ServiceApplicationService extends BaseService<ServiceApplicationModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('ServiceApplications'), errMsg);
  }

  changeApplicationStatus(resource, id) {
    return this.httpClient.post(this.appConfig.urls.url('ChangeApplicationStatus', id), resource).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getApplicationGroupByServiceId(): Observable<ServiceGroupModel[]> {
    return this.httpClient.get<ServiceGroupModel[]>(this.appConfig.urls.url('ApplicationGroupByServiceId')).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getProjectsGroupBySectorId(): Observable<ServiceGroupModel[]> {
    return this.httpClient.get<ServiceGroupModel[]>(this.appConfig.urls.url('ProjectGroupByStage')).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getProjectsGroupByEconomicSector(): Observable<ServiceGroupModel[]> {
    return this.httpClient.get<ServiceGroupModel[]>(this.appConfig.urls.url('ProjectGroupByEconomicSector')).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getAllProjectsProjectStage(): Observable<ServiceGroupModel[]> {
    return this.httpClient.get<ServiceGroupModel[]>(this.appConfig.urls.url('AllProjectByProjectStage')).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getServiceApplicationWithInvestor(serviceApplicationId: any) {
    return this.httpClient.get<ServiceGroupModel[]>(
      this.appConfig.urls.url('ServiceApplicationWithInvestor', serviceApplicationId)
    ).pipe(catchError(this.errMsg.parseObservableResponseError));
  }
}
