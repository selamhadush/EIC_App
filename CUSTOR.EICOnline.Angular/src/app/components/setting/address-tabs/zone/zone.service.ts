import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {AppConfiguration} from '../../../../config/appconfig';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Region, Zone} from '../../../../model/address';
import {ErrorMessage} from '../../../../../@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  zoneList: Zone[] = [];
  zoneModel: Zone = new Zone();
  regonModelList: Region[] = [];

  constructor(private httpClient: HttpClient,
    private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  /*getServicePrerequisiteForExistance(descEng,serviceId): Observable<Zone> {
    return this.httpClient.get<Zone>(this.config.urls.url('sector', descEng,serviceId))
      .map(servicePrereq => {
        this.zoneModel = servicePrereq;
        return this.zoneModel;
      })
      .catch(this.errMsg.parseObservableResponseError);
  }*/
  getZone(id): Observable<Zone> {
    return this.httpClient.get<Zone>(this.config.urls.url('zoneById', id)).pipe(
      map(zonedata => {
        this.zoneModel = zonedata;
        return this.zoneModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getZones(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.config.urls.url('zones')).pipe(
      map(zoneList => this.zoneList = zoneList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  saveZone(zoneModel: Zone): Observable<Zone> {
    console.log(zoneModel.ZoneId,
      zoneModel.RegionId,
      zoneModel.Description,
      zoneModel.DescriptionEnglish
    );
    return this.httpClient.post<Zone>(this.config.urls.url('zone'), zoneModel).pipe(
      map(ZoneData => {
        this.zoneModel = ZoneData;
        return this.zoneModel;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }

  deleteZone(zoneModel: Zone): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('zone', zoneModel.ZoneId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError));
  }

  getRegions(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(this.config.urls.url('regions')).pipe(
      map(regionList => {
        this.regonModelList = regionList;
        return this.regonModelList;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }
}
