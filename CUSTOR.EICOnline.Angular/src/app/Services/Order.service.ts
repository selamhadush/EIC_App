import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../config/appconfig';
import {ErrorMessage} from '../../@custor/services/errMessageService';
import {BaseService} from './Base.service';
import {OrderModel} from '../model/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<OrderModel> {
  constructor(protected http: HttpClient,
              protected appConfig: AppConfiguration,
              protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('order'), errMsg);
  }
}