import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from '../config/appconfig';
import { BaseService } from './Base.service';
import { ServiceModel } from '../model/Service.model';
import { ErrorMessage } from '../../@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService<ServiceModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('services'), errMsg);
  }
}