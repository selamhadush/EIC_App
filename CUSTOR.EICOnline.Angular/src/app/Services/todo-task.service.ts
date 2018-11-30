import {Injectable} from '@angular/core';
import {BaseService} from './Base.service';
import {ErrorMessage} from '@custor/services/errMessageService';
import {AppConfiguration} from '../config/appconfig';
import {HttpClient} from '@angular/common/http';
import {TodoTaskModel} from '../model/TodoTask.model';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoTaskService extends BaseService<TodoTaskModel> {

  constructor(
    protected http: HttpClient,
    public appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('TodoTasks'), errMsg);
  }

  countCompletedTask(id: any): Observable<number> {
    return this.httpClient.get<number>(this.appConfig.urls.url('CompletedTask') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError)
    );
  }

  countPendingTask(id: any): Observable<number> {
    return this.httpClient.get<number>(this.appConfig.urls.url('PendingTask') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError)
    );
  }


}
