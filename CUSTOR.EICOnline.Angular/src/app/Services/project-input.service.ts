import {Injectable} from '@angular/core';
import {BaseService} from './Base.service';
import {ProjectInputModel} from '../model/ProjectInput.model';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {ErrorMessage} from '../../@custor/services/errMessageService';
import {ProjectRequirementModel} from '../model/ProjectRequirement.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectInputService extends BaseService<ProjectInputModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('pInput'), errMsg);
  }

  saveAll(resource: ProjectInputModel[]): Observable<any[]> {
    return this.httpClient.post(this.appConfig.urls.url('pInput'), resource).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }



  InputsByProject(projectId: any): Observable<ProjectInputModel[]> {
    return this.httpClient.get(this.appConfig.urls.url('InputsByProject') + '/' + projectId).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }
}
