import { Observable, throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
export class ErrorMessage {
  constructor() {
    this.reset();
  }

  message: string;
  response: Response = null;

  reset() {
    this.message = '';
  }

  getError(msg) {
    if (typeof (msg) === 'object' && msg.message) {
      return msg.message;
    } else {
      return 'Unhandled error has occured!';
    }
  }

  /**
   * Parse a toPromise() .catch() clause error
   * from a response object and returns an ErrorMessage object
   * @param response
   * @returns {Promise<void>|Promise<T>}
   */
  parsePromiseResponseError(response) {
    if (response.hasOwnProperty('message')) {
      return Promise.reject(response);
    }
    if (response.hasOwnProperty('Message')) {
      response.message = response.Message;
      return Promise.reject(response);
    }

    // tslint:disable-next-line:prefer-const
    let err = new ErrorMessage();
    err.response = response;
    err.message = response.statusText;

    try {
      // tslint:disable-next-line:prefer-const
      let data = response.json();
      if (data && data.message) {
        err.message = data.message;
      }
    } catch (ex) {
    }

    return Promise.reject(err);
  }

  parseObservableResponseError(response): Observable<any> {
    let err = new ErrorMessage();

    // HttpClient has an `error` property for raw JSON response
    if (response.hasOwnProperty('error')) {
      try {
        err = JSON.parse(response.error);
      } catch (ex) {
      }

      if (err.hasOwnProperty('message')) {
        return observableThrowError(err);
      }
      if (err.hasOwnProperty('Message')) {
        err.message = err['Message'];
        return observableThrowError(err);
      }
    }
    if (response.hasOwnProperty('message')) {
      return observableThrowError(response);
    }
    if (response.hasOwnProperty('Message')) {
      response.message = response.Message;
      return observableThrowError(response);
    }

    err.response = response;
    err.message = response.statusText;

    try {
      // tslint:disable-next-line:prefer-const
      let data = response.json();
      if (data && data.message) {
        err.message = data.message;
      }
    } catch (ex) {
    }

    if (!err.message) {
      err.message = 'Unknown server failure.';
    }

    return observableThrowError(err);
  }
}