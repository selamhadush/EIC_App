import {Injectable} from '@angular/core';
import {BaseService} from './Base.service';
import {IncentiveLogModel} from '../model/IncentiveLog.model';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {ErrorMessage} from '@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class IncentiveLogService extends BaseService<IncentiveLogModel> {

  constructor(
      protected http: HttpClient,
      protected appConfig: AppConfiguration,
      protected  errMsg: ErrorMessage) {
      super(http, appConfig.urls.url('IncentiveLogs'), errMsg);
    }
}
