import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {ProjectNationalityCompositionModel} from '../model/ProjectNationalityComposition.model.';
import {BaseService} from './Base.service';
import {ErrorMessage} from '../../@custor/services/errMessageService';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ProjectNationalityCompositionService extends BaseService<ProjectNationalityCompositionModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('NationalityCompositions'), errMsg);
  }

  NationalityCompositionsByProject(projectId: any): Observable<ProjectNationalityCompositionModel[]> {
    return this.httpClient.get(this.appConfig.urls.url('NationalityCompositionsByProject') + '/' + projectId).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }
}
