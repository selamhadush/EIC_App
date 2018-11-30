import {Injectable} from '@angular/core';
import {ErrorMessage} from '@custor/services/errMessageService';
import {AppConfiguration} from '../config/appconfig';
import {BaseService} from './Base.service';
import {Lookup} from '../model/lookupData';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LookupsModel} from '../model/lookups';

@Injectable({
  providedIn: 'root'
})
export class LookUpService extends BaseService<Lookup> {

  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('InvestorTitle'), errMsg);
  }

  getLookupByParentId(id): Observable<LookupsModel[]> {
    return this.httpClient.get<LookupsModel[]>(this.appConfig.urls.url('lookupByParentId', id)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }
  getLookup(): Observable<LookupsModel[]> {
    return this.httpClient.get<LookupsModel[]>(this.appConfig.urls.url('lookup')).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }
  getLookupByParentIdandCode(id, code, code1): Observable<LookupsModel[]> {
    return this.httpClient.get<LookupsModel[]>(this.appConfig.urls.url('ByParentIdandByCode', id, code, code1)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }
  // getAllLookup(): Observable<LookupsModel[]> {
  //   return this.httpClient.get<LookupsModel[]>(this.appConfig.urls.url('lookup')).pipe(
  //     map(result => {
  //       return result;
  //     }),
  //     catchError(this.errMsg.parseObservableResponseError));
  // }
}
