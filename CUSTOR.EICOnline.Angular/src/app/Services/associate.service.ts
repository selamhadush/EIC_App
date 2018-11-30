import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorMessage} from '@custor/services/errMessageService';
import {AppConfiguration} from '../config/appconfig';
import {BaseService} from './Base.service';
import {AssociateModel} from '../model/associate.model';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AssociateService extends BaseService<AssociateModel> {

  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('associates'), errMsg);
  }

  getAssociateByInvestorId(id: number): Observable<AssociateModel[]> {
    return this.httpClient.get<AssociateModel[]>(this.appConfig.urls.url('byInvestorId') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  uploadDocument(resource: FormData): Observable<any[]> {
    return this.httpClient.post(this.appConfig.urls.url('document'), resource).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }
}
