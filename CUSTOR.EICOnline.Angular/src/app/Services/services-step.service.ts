import { Injectable } from '@angular/core';
import { BaseService } from './Base.service';
import { ServiceStepModel } from '../model/ServiceStep.model';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from '../config/appconfig';
import { ErrorMessage } from '../../@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class ServicesStepService extends BaseService<ServiceStepModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('servicesteppers'), errMsg);
  }
}