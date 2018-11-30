import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {ErrorMessage} from '@custor/services/errMessageService';
import {BaseService} from './Base.service';
import {ProjectSubstituteModel} from '../model/ProjectSubstitute.model';
import {ServiceApplicationModel} from '../model/ServiceApplication.model';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectSubstituteService extends BaseService<ProjectSubstituteModel> {

  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('ProjectSubstitutes'), errMsg);
  }

  getSubstituteByServiceApplicationId(id: number): Observable<ServiceApplicationModel> {
    return this.httpClient.get<ServiceApplicationModel>(this.appConfig.urls.url('ServiceApplicationSubstitute') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }
}
