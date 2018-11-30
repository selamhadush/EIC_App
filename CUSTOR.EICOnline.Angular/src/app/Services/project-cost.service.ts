import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectCostModel} from '../model/ProjectCost.model';
import {AppConfiguration} from '../config/appconfig';
import {BaseService} from './Base.service';
import {ErrorMessage} from '../../@custor/services/errMessageService';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class ProjectCostService extends BaseService<ProjectCostModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('projectCost'), errMsg);
  }

  getCostByProjectId(id: any): Observable<ProjectCostModel> {
    return this.httpClient.get<ProjectCostModel>(this.appConfig.urls.url('projectCostByProjectID') + '/' + id).pipe(
      map((data: any) => data as ProjectCostModel),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }


  getAllActualCost(id: any): Observable<ProjectCostModel[]> {
    return this.httpClient.get<ProjectCostModel[]>(this.appConfig.urls.url('ActualCost') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError)
    );
  }
}
