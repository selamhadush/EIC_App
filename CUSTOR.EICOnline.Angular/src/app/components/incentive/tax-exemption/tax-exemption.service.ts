import {Injectable} from '@angular/core';
import {TaxExemptionModel} from "../../../model/incentive/TaxExemption.model";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable} from "rxjs/index";
import {ErrorMessage} from "@custor/services/errMessageService";
import {AppConfiguration} from "../../../config/appconfig";
import {ProjectModel} from "../../../model/project.model";


@Injectable({
  providedIn: 'root'
})
export class TaxExemptionService {
  taxExemptionList: TaxExemptionModel[] = [];
  taxExemptionModel: TaxExemptionModel;
  projectModel: ProjectModel;

  constructor(private httpClient: HttpClient,
              public appConfig: AppConfiguration,
              private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  getTaxExemptionList(ProjectId: any): Observable<TaxExemptionModel[]> {
    return this.httpClient.get<TaxExemptionModel[]>(this.config.urls.url('taxexemptions', ProjectId)).pipe(
      map(taxExemptionList => this.taxExemptionList = taxExemptionList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getTaxExemptionYear(ProjectId: any): Observable<TaxExemptionModel[]> {
    return this.httpClient.get<TaxExemptionModel[]>(this.config.urls.url('taxexemptionyear', ProjectId)).pipe(
      map(taxExemptionList => this.taxExemptionList = taxExemptionList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getTaxExemption(id: any): Observable<TaxExemptionModel> {
    return this.httpClient.get<TaxExemptionModel>(`${this.appConfig.urls.url('taxexemption')}/${id}`).pipe(
      map((data: any) => data as TaxExemptionModel),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }

// getTaxExemption(id): Observable<TaxExemptionModel> {
//   return this.httpClient.get<TaxExemptionModel>(this.config.urls.url('taxExemption', id)).pipe(
//     map(taxExemptiondata => {
//       this.taxExemptionModel = taxExemptiondata;
//       return this.taxExemptionModel;
//     }),
//     catchError(this.errMsg.parseObservableResponseError));
// }

  saveTaxExemption(taxExemption: TaxExemptionModel): Observable<TaxExemptionModel> {
    return this.httpClient.post<TaxExemptionModel>(this.config.urls.url('taxexemption'), taxExemption).pipe(
      map(TaxExemptionItem => {
        this.taxExemptionModel = TaxExemptionItem;
        console.log(this.taxExemptionModel);
        return this.taxExemptionModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  deleteTaxExemption(id:any): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('taxexemption', id)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError),);
  }

}
