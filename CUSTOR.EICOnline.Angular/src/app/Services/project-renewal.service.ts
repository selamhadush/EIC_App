import {Injectable} from '@angular/core';
import {BaseService} from './Base.service';
import {ProjectRenewalModel} from '../model/ProjectRenewal.model';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {ErrorMessage} from '@custor/services/errMessageService';
import {Observable} from 'rxjs/internal/Observable';
import {ServiceApplicationModel} from '../model/ServiceApplication.model';
import {ProjectModel} from '../model/project.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectRenewalService extends BaseService<ProjectRenewalModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('projectRenewals'), errMsg);
  }

  getRenewalByServiceApplicationId(id: number): Observable<ServiceApplicationModel> {
    return this.httpClient.get<ServiceApplicationModel>(this.appConfig.urls.url('ServiceApplicationWithRenewal') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }
}
