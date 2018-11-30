import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { ServiceApplicationModel } from '../model/ServiceApplication.model';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from '../config/appconfig';
import { ErrorMessage } from '../../@custor/services/errMessageService';
import { catchError, map } from 'rxjs/operators';
import { KebeleModel } from '../model/address/Kebele.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CertificateService extends BaseService<ServiceApplicationModel> {
  private kebeleList: KebeleModel[];

  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('certificate'), errMsg);
  }

  getInvestorAddress(id: string): Observable<KebeleModel[]> {
    return this.httpClient.get<KebeleModel[]>(this.appConfig.urls.url('investorAdress', id)).pipe(
      map(kebeleList => this.kebeleList = kebeleList),
      catchError(this.errMsg.parseObservableResponseError));
  }
}