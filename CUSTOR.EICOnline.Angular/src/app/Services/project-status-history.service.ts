import {Injectable} from '@angular/core';
import {BaseService} from './Base.service';
import {ProjectStatusHistoryModel} from '../model/ProjectStatusHistory.Model';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {ErrorMessage} from '@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusHistoryService extends BaseService<ProjectStatusHistoryModel> {

 constructor(
     protected http: HttpClient,
     protected appConfig: AppConfiguration,
     protected  errMsg: ErrorMessage) {
     super(http, appConfig.urls.url('ProjectStatusHistory'), errMsg);
   }
}
