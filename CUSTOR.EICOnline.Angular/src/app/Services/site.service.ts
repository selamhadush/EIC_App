import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {AppConfiguration} from '../config/appconfig';
import {HttpClient} from '@angular/common/http';

import {SiteModel} from '../model/Site.model';
import {ErrorMessage} from '../../@custor/services/errMessageService';
import {BaseService} from './Base.service';

@Injectable()
export class SiteService extends BaseService<SiteModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('sites'), errMsg);
  }


  getAllSite(): Observable<SiteModel[]> {
    return this.httpClient.get<SiteModel[]>(this.appConfig.urls.url('site')).pipe(
      map(result => {
        return result;
      }), catchError(this.errMsg.parseObservableResponseError));
  }
}
