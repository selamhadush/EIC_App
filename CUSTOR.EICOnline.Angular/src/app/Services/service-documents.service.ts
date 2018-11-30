import { Injectable } from '@angular/core';
import { AppConfiguration } from '../config/appconfig';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './Base.service';
import { ErrorMessage } from '../../@custor/services/errMessageService';
import { DocumentModel } from '../model/Document.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceDocumentsService extends BaseService<DocumentModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('document'), errMsg);
  }
}