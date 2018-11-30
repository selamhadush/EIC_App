import {Injectable} from '@angular/core';
import {BaseService} from './Base.service';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {ErrorMessage} from '@custor/services/errMessageService';
import {CapitalRegistrationModel} from '../model/CapitalRegistration.model';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CapitalRegistrationService extends BaseService<CapitalRegistrationModel> {

  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('CapitalRegistrations'), errMsg);
  }

  getCapitalRegistrationByProjectId(id: any): Observable<CapitalRegistrationModel[]> {
    return this.httpClient.get<CapitalRegistrationModel[]>
    (this.appConfig.urls.url('CapitalRegistrationsByProject') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError)
    );
  }
}
