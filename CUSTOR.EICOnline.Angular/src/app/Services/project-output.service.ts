import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { ProjectOutputModel } from '../model/ProjectOutput.model';
import { AppConfiguration } from '../config/appconfig';
import { HttpClient } from '@angular/common/http';
import { ErrorMessage } from '../../@custor/services/errMessageService';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectOutputService extends BaseService<ProjectOutputModel> {
  constructor(protected http: HttpClient,
    public appConfig: AppConfiguration,
    errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('pOutPut'), errMsg);
  }

  getPOutPutByProject(id: any): Observable<ProjectOutputModel[]> {
    return this.httpClient.get<ProjectOutputModel>(this.appConfig.urls.url('pOutPutByProject') + '/' + id).pipe(
      map((data: any) => data as ProjectOutputModel),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }
  getPOutActual(id: any): Observable<ProjectOutputModel[]> {
    return this.httpClient.get<ProjectOutputModel>(this.appConfig.urls.url('ActualProduct') + '/' + id).pipe(
      map((data: any) => data as ProjectOutputModel),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }
}
