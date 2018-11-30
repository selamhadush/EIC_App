import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { AppConfiguration } from '../../../../config/appconfig';
import { Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { Region } from '../../../../model/address';
import { ErrorMessage } from '../../../../../@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  regionList: Region[] = [];
  regionModel: Region = new Region();

  constructor(private httpClient: HttpClient,
    private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  /*getServicePrerequisiteForExistance(descEng,serviceId): Observable<RegionModel> {
    return this.httpClient.get<RegionModel>(this.config.urls.url('Region', descEng,serviceId))
      .map(servicePrereq => {
        this.RegionModel = servicePrereq;
        return this.RegionModel;
      })
      .catch(this.errMsg.parseObservableResponseError);
  }*/
  getRegion(id): Observable<Region> {
    return this.httpClient.get<Region>(this.config.urls.url('regionsById', id)).pipe(
      map(Regiondata => {
        this.regionModel = Regiondata;
        return this.regionModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getRegions(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(this.config.urls.url('regions')).pipe(
      map(RegionList => this.regionList = RegionList),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  saveRegion(regionModel: Region): Observable<Region> {
    console.log(regionModel.RegionId,
      regionModel.Description,
      regionModel.DescriptionEnglish,
    );
    return this.httpClient.post<Region>(this.config.urls.url('region'), regionModel).pipe(
      map(RegionData => {
        this.regionModel = RegionData;
        return this.regionModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  deleteRegion(regionModel: Region): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('region', regionModel.RegionId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError), );
  }
}
