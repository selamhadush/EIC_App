import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ErrorMessage} from '@custor/services/errMessageService';
import {AppConfiguration} from '../../../../config/appconfig';
import {SiteModel} from '../../../../model/Site.model';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  siteModel: SiteModel = new SiteModel();
  siteList: SiteModel[];

  constructor(private httpClient: HttpClient,
              private config: AppConfiguration, private errMsg: ErrorMessage) {
  }


  getSite(id): Observable<SiteModel> {
    return this.httpClient.get<SiteModel>(this.config.urls.url('site', id)).pipe(
      map(sitePrereq => {
        this.siteModel = sitePrereq;
        return this.siteModel;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  getSites(): Observable<SiteModel[]> {
    return this.httpClient.get<SiteModel[]>(this.config.urls.url('sites')).pipe(
      map(siteList => this.siteList = siteList,
      ),

      catchError(this.errMsg.parseObservableResponseError));
  }

  saveSite(siteModel: SiteModel): Observable<SiteModel> {
    console.log(siteModel.SiteId,
      siteModel.Name,
      siteModel.NameEnglish,
      siteModel.IsActive
    );
    return this.httpClient.post<SiteModel>(this.config.urls.url('site'), siteModel).pipe(
      map(SitePrereq => {
        this.siteModel = SitePrereq;
        return this.siteModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  deleteSite(siteModel: SiteModel): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('site', siteModel.SiteId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError));
  }
}
