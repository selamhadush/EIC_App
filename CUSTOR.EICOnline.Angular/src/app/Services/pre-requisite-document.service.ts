import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from '../config/appconfig';
import { BaseService } from './Base.service';
import { DocumentModel } from '../model/Document.model';
import { Observable } from 'rxjs/Rx';
import { SearchModel } from '../model/search.model';
import { catchError } from 'rxjs/operators';
import { ErrorMessage } from '../../@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class PreRequisiteDocumentService extends BaseService<DocumentModel> {
  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('document'), errMsg);
  }

  uploadDocument(resource: FormData): Observable<any[]> {
    return this.httpClient.post(this.appConfig.urls.url('document'), resource).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }
}