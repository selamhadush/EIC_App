import { Injectable } from '@angular/core';
import {BlRegistration} from '../../components/bl-reg/bl-registrationModel';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';
import {AppConfiguration} from '../../config/appconfig';
import {ErrorMessage} from '@custor/services/errMessageService';

@Injectable()
export class BlRegistrationService {
  constructor(private httpClient: HttpClient,
              private config: AppConfiguration,
              private errMsg: ErrorMessage) {
  }

  // getSector(): Observable<BlRegistration[]> {
  //   return this.http.get<BlRegistration[]>(this.appConfig.urls.url)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  getMajorDivision() {
    return this.httpClient.get(this.config.urls.url('MajorDivisions')).pipe(
      map(result => {
        return result;
      }), catchError(this.errMsg.parseObservableResponseError));
  }
  getDivision() {
    return this.httpClient.get(this.config.urls.url('Divisions')).pipe(
      map(result => {
        return result;
      }), catchError(this.errMsg.parseObservableResponseError));
  }

  getMajorGroup() {
    return this.httpClient.get(this.config.urls.url('MajorGroup')).pipe(
      map(result => {
        return result;
      }), catchError(this.errMsg.parseObservableResponseError));
  }

  getGroup() {
    return this.httpClient.get(this.config.urls.url('Groups')).pipe(
      map(result => {
        return result;
      }), catchError(this.errMsg.parseObservableResponseError));
  }

//   // insert new costomer details
//   addSector( blreg: BlRegistration): Observable<any> {
//     return this.http.post(this.baseUrl, blreg)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }
  // custom handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
