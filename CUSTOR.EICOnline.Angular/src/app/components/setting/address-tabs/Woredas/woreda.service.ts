import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { AppConfiguration } from '../../../../config/appconfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Region, Woreda, Zone } from '../../../../model/address';
import { ErrorMessage } from '../../../../../@custor/services/errMessageService';
import { WoredaModel } from '../../../../model/address/Woreda.model';

@Injectable({
  providedIn: 'root'
})
export class WoredaService {
  woredaList: Woreda[] = [];
  woredaModel: Woreda = new Woreda();
  regionList: Region[] = [];
  zoneList: Zone[] = [];

  constructor(private httpClient: HttpClient,
    private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  /*getServicePrerequisiteForExistance(descEng,serviceId): Observable<Woreda> {
    return this.httpClient.get<Woreda>(this.config.urls.url('sector', descEng,serviceId))
      .map(servicePrereq => {
        this.woredaModel = servicePrereq;
        return this.woredaModel;
      })
      .catch(this.errMsg.parseObservableResponseError);
  }*/
  getWoreda(id): Observable<Woreda> {
    return this.httpClient.get<Woreda>(this.config.urls.url('woreda', id)).pipe(
      map(woredaData => {
        this.woredaModel = woredaData;
        return this.woredaModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getWoredas(): Observable<Woreda[]> {
    return this.httpClient.get<Woreda[]>(this.config.urls.url('woredas')).pipe(
      map(woredaList => this.woredaList = woredaList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  saveWoreda(woredaModel: Woreda): Observable<Woreda> {
    console.log(woredaModel.WoredaId,
      woredaModel.ZoneId,
      woredaModel.Description,
      woredaModel.DescriptionEnglish
    );
    return this.httpClient.post<Woreda>(this.config.urls.url('woreda'), woredaModel).pipe(
      map(woredaData => {
        this.woredaModel = woredaData;
        return this.woredaModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  deleteWoreda(woredaModel: Woreda): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('woreda', woredaModel.WoredaId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError), );
  }

  getRegions(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(this.config.urls.url('regions')).pipe(
      map(regionList => {
        this.regionList = regionList;
        return this.regionList;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getZones(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.config.urls.url('zones')).pipe(
      map(zones => {
        this.zoneList = zones;
        return this.zoneList;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }
}
