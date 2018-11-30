import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {ErrorMessage} from '../../@custor/services/errMessageService';

@Injectable()
export abstract class BaseService<T> {
  protected constructor(protected httpClient: HttpClient,
                        protected url: string,
                        protected errMsg: ErrorMessage) {
  }

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url).pipe(
      map((data: any) => data as T),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }

  getOneById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + '/' + id).pipe(
      map((data: any) => data as T),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }

  getAllById(id: number): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url + '/' + id).pipe(
      map((data: any) => data as T),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }

  create(resource: T): Observable<T> {
    return this.httpClient.post(this.url, resource).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  update(resource, id) {
    console.log(resource);
    return this.httpClient.put(this.url + '/' + id, resource).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  delete(id) {
    return this.httpClient.delete(this.url + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  protected handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');

    // either applicationError in header or model error in body
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    let modelStateErrors = '';
    const serverError = error.json();

    if (!serverError.type) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return Observable.throw(modelStateErrors || 'Server error');
  }
}