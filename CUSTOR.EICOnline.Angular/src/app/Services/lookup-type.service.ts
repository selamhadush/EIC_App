import {Injectable} from '@angular/core';
import {ErrorMessage} from '@custor/services/errMessageService';
import {AppConfiguration} from '../config/appconfig';
import {BaseService} from './Base.service';
import {Lookup, LookupType} from '../model/lookupData';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LookuptypesModel} from '../model/lookuptypes';

@Injectable({
  providedIn: 'root'
})
export class LookupTypeService extends BaseService<LookupType> {

  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('InvestorTitle'), errMsg);
  }

  getLookupByParentId(): Observable<LookuptypesModel[]> {
    return this.httpClient.get<LookuptypesModel[]>(this.appConfig.urls.url('incentivecategorylookup')).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }
  getAllLookup(): Observable<LookuptypesModel[]> {
    return this.httpClient.get<LookuptypesModel[]>(this.appConfig.urls.url('lookuptype')).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }
}
