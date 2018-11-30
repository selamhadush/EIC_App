import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LetterTemplateModel} from '../../model/letter-template.model';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import {ErrorMessage} from '@custor/services/errMessageService';
import {AppConfiguration} from '../../config/appconfig';

@Injectable({
  providedIn: 'root'
})
export class LettertepmlateService {
  constructor(private httpClient: HttpClient,
              public appConfig: AppConfiguration,
              private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  letterTemplateList: LetterTemplateModel[] = [];
  LetterTemplateModel: LetterTemplateModel;

  getLetterTemplateList(): Observable<LetterTemplateModel[]> {
    return this.httpClient.get<LetterTemplateModel[]>(this.config.urls.url('letterTemplates')).pipe(
      map(letterTemplateList => this.letterTemplateList = letterTemplateList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getletterTemplate(id: any): Observable<LetterTemplateModel> {
    return this.httpClient.get<LetterTemplateModel>(this.config.urls.url('letterTemplate', id)).pipe(
      map(letterTemplatedata => {
        this.LetterTemplateModel = letterTemplatedata;
        return this.LetterTemplateModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  saveletterTemplate(data: LetterTemplateModel): Observable<LetterTemplateModel> {
    return this.httpClient.post<LetterTemplateModel>(this.config.urls.url('letterTemplate'), data).pipe(
      map(letterTemplate => {
        this.LetterTemplateModel = letterTemplate;
        console.log(this.LetterTemplateModel);
        return this.LetterTemplateModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  deleteletterTemplate(id): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('letterTemplate', id)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError));
  }

}
