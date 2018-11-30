import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ErrorMessage} from '@custor/services/errMessageService';
import {LetterModel} from '../../../model/letterModel';
import {catchError, map} from 'rxjs/operators';
import {AppConfiguration} from '../../../config/appconfig';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LetterService {
  letterModelList: LetterModel[] = [];
  letterModel: LetterModel;

  constructor(private httpClient: HttpClient,
              public appConfig: AppConfiguration,
              private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  getLetterList(projectId: any): Observable<LetterModel[]> {
    return this.httpClient.get<LetterModel[]>(this.config.urls.url('letters', projectId)).pipe(
      map(letterModelList => this.letterModelList = letterModelList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getletter(id: any): Observable<LetterModel> {
    return this.httpClient.get<LetterModel>(this.config.urls.url('letter', id)).pipe(
      map(letterModeldata => {
        this.letterModel = letterModeldata;
        return this.letterModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  saveletter(data: LetterModel): Observable<LetterModel> {
    return this.httpClient.post<LetterModel>(this.config.urls.url('letter'), data).pipe(
      map(letterModel => {
        this.letterModel = letterModel;
        // console.log(this.letterModel);
        return this.letterModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  deleteletter(id): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('letter', id)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError));
  }

}
