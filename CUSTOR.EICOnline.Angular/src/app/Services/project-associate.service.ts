import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {ErrorMessage} from '@custor/services/errMessageService';
import {BaseService} from './Base.service';
import {ProjectAssociateModel} from '../model/ProjectAssociate.model';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProjectAssociateService extends BaseService<ProjectAssociateModel> {

  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('ProjectAssociates'), errMsg);
  }

  associateProject(projectId: any): Observable<ProjectAssociateModel[]> {
    return this.httpClient.get(this.appConfig.urls.url('ProjectAssociatesByProject') + '/' + projectId).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }
}
