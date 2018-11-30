import {Injectable} from '@angular/core';
import {BaseService} from './Base.service';
import {ProjectCancellationModel} from '../model/project/ProjectCancellation.model';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {ErrorMessage} from '@custor/services/errMessageService';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {ServiceApplicationModel} from '../model/ServiceApplication.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectCancellationService extends BaseService<ProjectCancellationModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('ProjectCancellations'), errMsg);
  }

  getCancellationByServiceApplicationId(id: number): Observable<ServiceApplicationModel> {
    return this.httpClient.get<ServiceApplicationModel>(this.appConfig.urls.url('ServiceApplicationCancellation') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

}
