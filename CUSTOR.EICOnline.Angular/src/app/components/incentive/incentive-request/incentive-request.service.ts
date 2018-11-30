import {Injectable} from '@angular/core';
import {AppConfiguration} from '../../../config/appconfig';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {ErrorMessage} from '@custor/services/errMessageService';
import {IncentiveRequestModel} from '../../../model/IncentiveRequest.model';

@Injectable({
  providedIn: 'root'
})
export class IncentiveRequestService {
  incentiveRequestList: IncentiveRequestModel[] = [];
  incentiveRequestModel: IncentiveRequestModel;

  constructor(private httpClient: HttpClient,
              public appConfig: AppConfiguration,
              private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  getIncentiveRequests(): Observable<IncentiveRequestModel[]> {
    return this.httpClient.get<IncentiveRequestModel[]>(this.config.urls.url('incentiveRequests')).pipe(
      map(incentiveRequestList => this.incentiveRequestList = incentiveRequestList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getIncentiveRequestslists(id: any): Observable<IncentiveRequestModel[]> {
    return this.httpClient.get<IncentiveRequestModel>(`${this.appConfig.urls.url('incentiveRequestsothers')}/${id}`).pipe(
      map((data: any) => data as IncentiveRequestModel),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }

  getIncentiveRequestslist(projectId: any, ServiceApplicationId: any): Observable<IncentiveRequestModel[]> {
    return this.httpClient.get<IncentiveRequestModel>(this.appConfig.urls.url('incentiveRequests', projectId, ServiceApplicationId)).pipe(
      map((data: any) => data as IncentiveRequestModel),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }



  // getIncentiveRequestslist(id: any): Observable<IncentiveRequestModel[]> {
  //   return this.httpClient.get<IncentiveRequestModel>(`${this.appConfig.urls.url('incentiveRequests')}/${id}`).pipe(
  //     map((data: any) => data as IncentiveRequestModel),
  //     catchError(this.errMsg.parseObservableResponseError)
  //   );
  // }

  getIncentiveRequestByServiceApplicationId(id): Observable<IncentiveRequestModel[]> {
    return this.httpClient.get<IncentiveRequestModel[]>(this.config.urls.url('incentiveRequestByServiceAppId', id)).pipe(
      map(incentiveRequestdata => {
        this.incentiveRequestList = incentiveRequestdata;
        return this.incentiveRequestList;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getIncentiveRequest(id): Observable<IncentiveRequestModel> {
    return this.httpClient.get<IncentiveRequestModel>(this.config.urls.url('incentiveRequest', id)).pipe(
      map(incentiveRequestdata => {
        this.incentiveRequestModel = incentiveRequestdata;
        return this.incentiveRequestModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  saveIncentiveRequest(incentiveRequest: IncentiveRequestModel): Observable<IncentiveRequestModel> {
    return this.httpClient.post<IncentiveRequestModel>(this.config.urls.url('incentiveRequest'), incentiveRequest).pipe(
      map(IncentiveRequest => {
        console.log(this.incentiveRequestModel);
        this.incentiveRequestModel = IncentiveRequest;
        return this.incentiveRequestModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  deleteIncentiveRequest(id): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('incentiveRequest', id)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError),);
  }

}
