import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {ProjectEmploymentModel} from '../model/ProjectEmployment.model';
import {BaseService} from './Base.service';
import {ErrorMessage} from '../../@custor/services/errMessageService';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ProjectEmploymentService extends BaseService<ProjectEmploymentModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('projectEmployment'), errMsg);

  }

  employmentByProject(projectId: any): Observable<ProjectEmploymentModel> {
    return this.httpClient.get(this.appConfig.urls.url('employmentByProject') + '/' + projectId).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getAllActualEmployment(projectId: any): Observable<ProjectEmploymentModel[]> {
    return this.httpClient.get<ProjectEmploymentModel[]>(this.appConfig.urls.url('ActualEmployment') + '/' + projectId).pipe(
      catchError(this.errMsg.parseObservableResponseError)
    );
  }
}
