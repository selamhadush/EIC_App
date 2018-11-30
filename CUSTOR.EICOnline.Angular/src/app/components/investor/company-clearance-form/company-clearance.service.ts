import {Injectable} from '@angular/core';
import {BaseService} from "../../../Services/Base.service";
import {HttpClient} from "@angular/common/http";
import {AppConfiguration} from "../../../config/appconfig";
import {ErrorMessage} from "@custor/services/errMessageService";
import {CompanyClearanceModel} from "./CompanyClearance.Model";

@Injectable({
  providedIn: 'root'
})
export class CompanyClearanceService extends BaseService<CompanyClearanceModel> {


  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('CompanyClearances'), errMsg);
  }
}
