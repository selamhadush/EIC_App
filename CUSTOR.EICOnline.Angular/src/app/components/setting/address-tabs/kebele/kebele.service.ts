import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { AppConfiguration } from '../../../../config/appconfig';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Kebele, Region, Woreda, Zone } from '../../../../model/address';
import { ErrorMessage } from '../../../../../@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class KebeleService {
  kebeleModel: Kebele = new Kebele();
  kebeleModelList: Kebele[] = [];
  woredaLIst: Woreda[] = [];
  regionLIst: Region[] = [];
  zoneLIst: Zone[] = [];

  constructor(private httpClient: HttpClient,
    private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  /*getServicePrerequisiteForExistance(descEng,serviceId): Observable<Woreda> {
    return this.httpClient.get<Woreda>(this.config.urls.url('sector', descEng,serviceId))
      .map(servicePrereq => {
        this.activityModel = servicePrereq;
        return this.activityModel;
      })
      .catch(this.errMsg.parseObservableResponseError);
  }*/
  getKebele(id): Observable<Kebele> {
    return this.httpClient.get<Kebele>(this.config.urls.url('kebeleById', id)).pipe(
      map(kebeleData => {
        // this.kebeleModel = kebeleData;
        return kebeleData;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getKebeles(): Observable<Kebele[]> {
    return this.httpClient.get<Kebele[]>(this.config.urls.url('kebeles')).pipe(
      map(kebeleList => this.kebeleModelList = kebeleList),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  saveKebele(kebeleModel: Kebele): Observable<Kebele> {
    console.log(kebeleModel.KebeleId,
      kebeleModel.WoredaId,
      kebeleModel.ZoneId,
      kebeleModel.Description,
      kebeleModel.DescriptionEnglish
    );
    return this.httpClient.post<Kebele>(this.config.urls.url('kebele'), kebeleModel).pipe(
      map(keb => {
        this.kebeleModel = keb;
        return this.kebeleModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  deleteKebele(kebeleModel: Kebele): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('kebele', kebeleModel.KebeleId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError), );
  }

  getRegions(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(this.config.urls.url('regions')).pipe(
      map(regionList => {
        this.regionLIst = regionList;
        return this.regionLIst;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getZones(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.config.urls.url('zones')).pipe(
      map(subsector => {
        this.zoneLIst = subsector;
        return this.zoneLIst;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getWoredas(): Observable<Woreda[]> {
    return this.httpClient.get<Woreda[]>(this.config.urls.url('woredas')).pipe(
      map(act => {
        this.woredaLIst = act;
        return this.woredaLIst;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }
}
