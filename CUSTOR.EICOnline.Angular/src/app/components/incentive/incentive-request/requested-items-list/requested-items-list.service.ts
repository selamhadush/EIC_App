import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../../../../config/appconfig';
import {ErrorMessage} from '@custor/services/errMessageService';
import {IncentiveBoMRequestItemModel} from '../../../../model/incentive/IncentiveBoMRequestItem.model';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';
import {IncentiveRequestDetailModel} from '../../../../model/IncentiveRequestDetail.Model';
import {IncentiveRequestModel} from '../../../../model/IncentiveRequest.model';


@Injectable({
  providedIn: 'root'
})
export class IncentiveRequestDetailService {
  constructor(private httpClient: HttpClient,
              public appConfig: AppConfiguration,
              private config: AppConfiguration,
              private errMsg: ErrorMessage) {
  }

  incentiveRequestItemList: IncentiveRequestDetailModel[] = [];
  incentiveRequestDetailModel: IncentiveRequestDetailModel;
  incentiveBoMRequestItemList: IncentiveBoMRequestItemModel[] = [];
  incentiveBoMRequestDetailModel: IncentiveBoMRequestItemModel;

  getIncentiveRequestItems(): Observable<IncentiveRequestDetailModel[]> {
    return this.httpClient.get<IncentiveRequestDetailModel[]>(this.config.urls.url('IncentiveRequestDetail')).pipe(
      map(incentiveRequestItemList => this.incentiveRequestItemList = incentiveRequestItemList),
      catchError(this.errMsg.parseObservableResponseError));
  }
  getIncentiveRequestItemslist(id: any): Observable<IncentiveRequestDetailModel[]> {
    return this.httpClient.get<IncentiveRequestDetailModel>(`${this.appConfig.urls.url('IncentiveRequestDetail')}/${id}`).pipe(
      map((data: any) => data as IncentiveRequestDetailModel),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }

  getIncentiveRequestDetails(projectId: any): Observable<IncentiveRequestDetailModel[]> {
    return this.httpClient.get<IncentiveRequestDetailModel[]>(this.config.urls.url('IncentiveRequestDetail', projectId)).pipe(
      map(incentiveRequestItemList => this.incentiveRequestItemList = incentiveRequestItemList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getIncentiveRequestDetailsByProjectId(id: any): Observable<IncentiveRequestDetailModel[]> {
    return this.httpClient.get<IncentiveRequestDetailModel[]>(this.config.urls.url('IncentiveRequestDetail', id)).pipe(
      map(incentiveRequestItemList => this.incentiveRequestItemList = incentiveRequestItemList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getIncentiveRequestslistByProjectId(projectId: any): Observable<IncentiveRequestDetailModel[]> {
    return this.httpClient.get<IncentiveRequestDetailModel>(this.appConfig.urls.url('IncentiveRequestDetailofSparePart', projectId)).pipe(
      map((data: any) => data as IncentiveRequestDetailModel),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }

  getIncentiveRequestsDetailByProjectId(projectId: any): Observable<IncentiveRequestDetailModel[]> {
    return this.httpClient.get<IncentiveRequestDetailModel>(this.appConfig.urls.url('incentiveRequestsDetailByProjectId', projectId)).pipe(
      map((data: any) => data as IncentiveRequestDetailModel),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }

  getIncentiveRequestItem(id): Observable<IncentiveRequestDetailModel> {
    return this.httpClient.get<IncentiveRequestDetailModel>(this.config.urls.url('IncentiveRequestDetail', id)).pipe(
      map(incentiveRequestItemdata => {
        this.incentiveRequestDetailModel = incentiveRequestItemdata;
        return this.incentiveRequestDetailModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }
  getIncentiveBoMRequestDetails(projectId: any, incentiveCategoryId: any): Observable<IncentiveBoMRequestItemModel[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<IncentiveBoMRequestItemModel[]>(this.config.urls.url('IncentiveBoMRequestItems', projectId, incentiveCategoryId)).pipe(
      map(incentiveBoMRequestItemList => this.incentiveBoMRequestItemList = incentiveBoMRequestItemList),
      catchError(this.errMsg.parseObservableResponseError));
  }
  getIncentiveBoMRequestDetail(id: number): Observable<IncentiveBoMRequestItemModel> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<IncentiveBoMRequestItemModel>(this.config.urls.url('IncentiveBoMRequestItems', id)).pipe(
      map(incentiveBoMRequestItem => this.incentiveBoMRequestDetailModel = incentiveBoMRequestItem),
      catchError(this.errMsg.parseObservableResponseError));
  }
  saveIncentiveRequestItem(incentiveRequestItem: IncentiveRequestDetailModel): Observable<IncentiveRequestDetailModel> {
     return this.httpClient.post<IncentiveRequestDetailModel>(this.config.urls.url('IncentiveRequestDetail'), incentiveRequestItem).pipe(
      map(IncentiveRequestItem => {
        this.incentiveRequestDetailModel = IncentiveRequestItem;
        return this.incentiveRequestDetailModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }
  addIncentiveRequestItem(incentiveRequestItem: IncentiveRequestDetailModel, bOMTableId: number): Observable<IncentiveRequestDetailModel> {
    return this.httpClient.post<IncentiveRequestDetailModel>(this.config.urls.url('IncentiveRequestDetail'), incentiveRequestItem).pipe(
     map(IncentiveRequestItem => {
       this.incentiveRequestDetailModel = IncentiveRequestItem;
       return this.incentiveRequestDetailModel;
     }),
     catchError(this.errMsg.parseObservableResponseError));
 }
  updateIncentiveRequestItem(incentiveRequestItem: IncentiveRequestDetailModel): Observable<IncentiveRequestDetailModel> {
    return this.httpClient.put<IncentiveRequestDetailModel>(this.config.urls.url('IncentiveRequestDetail'), incentiveRequestItem).pipe(
     map(IncentiveRequestItem => {
       this.incentiveRequestDetailModel = IncentiveRequestItem;
       return this.incentiveRequestDetailModel;
     }),
     catchError(this.errMsg.parseObservableResponseError));
 }
  deleteIncentiveRequestItem(id): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('IncentiveRequestDetail', id)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError), );
  }

}
