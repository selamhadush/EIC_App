///<reference path="../../../node_modules/@angular/core/src/error_handler.d.ts"/>
import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService extends ErrorHandler {

  constructor(private injector: Injector) {
    super();
  }

  handleError(error: any) {
    const router = this.injector.get(Router);
    console.log(`request url:${router.url}`);
    if (error instanceof HttpErrorResponse) {
      console.log('back end   returned status code', error.status);
      console.log('error message', error.message);
    } else {
      console.log('an error occured', error.message);
    }
    // router.navigate(['error']);
  }
}
