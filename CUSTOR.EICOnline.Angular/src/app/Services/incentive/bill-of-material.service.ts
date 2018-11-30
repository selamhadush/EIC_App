import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../../config/appconfig';
import {ErrorMessage} from '@custor/services/errMessageService';
import {BaseService} from '../Base.service';
import {IncentiveBoMRequestItemModel} from '../../model/incentive/IncentiveBoMRequestItem.model';
import {Observable} from '../../../../node_modules/rxjs/Rx';
import {catchError} from 'rxjs/operators';
import {ServiceApplicationModel} from '../../model/ServiceApplication.model';

@Injectable({
  providedIn: 'root'
})
export class BillOfMaterialService extends BaseService<IncentiveBoMRequestItemModel> {

  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('IncentiveBoMImportItems'), errMsg);
  }

  uploadDocument(resource: FormData): Observable<any[]> {
    return this.httpClient.post(this.appConfig.urls.url('IncentiveBoMImportItem'), resource).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  finalForApprovalBillOfMaterial(id): Observable<BillOfMaterialService[]> {
    return this.httpClient.get<BillOfMaterialService>(this.appConfig.urls.url('IncentiveBoMImportItemsFinalForApproval', id)).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getBillOfMaterialByProjectId(id: number): Observable<IncentiveBoMRequestItemModel[]> {
    return this.httpClient.get<IncentiveBoMRequestItemModel>(this.appConfig.urls.url('IncentiveBoMImportItemByProjectId') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }
  getBillOfMaterialByServiceApplicationId(id: number): Observable<ServiceApplicationModel> {
    return this.httpClient.get<ServiceApplicationModel>(this.appConfig.urls.url('ServiceApplicationBillOfMaterial') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }
}
