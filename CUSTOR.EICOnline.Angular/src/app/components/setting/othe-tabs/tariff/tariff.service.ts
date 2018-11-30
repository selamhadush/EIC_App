import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TariffModel } from '../../../../model/tariff';
import { AppConfiguration } from '../../../../config/appconfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorMessage } from '../../../../../@custor/services/errMessageService';

@Injectable()
export class TariffService {
  constructor(private httpClient: HttpClient,
    private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  tariffList: TariffModel[] = [];
  tariffModel: TariffModel;

  getTariffs(): Observable<TariffModel[]> {
    return this.httpClient.get<TariffModel[]>(this.config.urls.url('tariffs')).pipe(
      map(tariffList => this.tariffList = tariffList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  /*  getTariffForExistance(descEng, serviceId): Observable<Tariff> {
      return this.httpClient.get<tariffModel>(this.config.urls.url('tariff', descEng, serviceId)).pipe(
        map(servicePrereq => {
          this.tariffModel = servicePrereq;
          return this.tariffModel;
        }),
        catchError(this.errMsg.parseObservableResponseError), );
    }*/
  getTariff(id): Observable<TariffModel> {
    return this.httpClient.get<TariffModel>(this.config.urls.url('tariff', id)).pipe(
      map(tariffdata => {
        this.tariffModel = tariffdata;
        return this.tariffModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  saveTariff(tariff: TariffModel): Observable<TariffModel> {
    console.log(tariff.TariffId,
      //  tariff.Description,
      //  tariff.DescriptionEnglish,
      //  tariff.ServiceId,
      tariff.IsActive
    );
    return this.httpClient.post<TariffModel>(this.config.urls.url('tariff'), tariff).pipe(
      map(Taruff => {
        this.tariffModel = Taruff;
        return this.tariffModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  deleteTariff(tariff: TariffModel): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('tariff', tariff.TariffId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError));
  }
}