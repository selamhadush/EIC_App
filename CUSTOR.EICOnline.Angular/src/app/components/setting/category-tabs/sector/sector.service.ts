import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { catchError, map } from 'rxjs/operators';
import { AppConfiguration } from '../../../../config/appconfig';
import { SectorModel } from '../../../../model/sector';
import { ErrorMessage } from '../../../../../@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  constructor(private httpClient: HttpClient,
    private config: AppConfiguration, private errMsg: ErrorMessage) {
  }
  sectorList: SectorModel[] = [];
  // sectorModel: SectorModel = new SectorModel();
  // sectorList: SectorModel[];
  sectorModel: SectorModel = new SectorModel();

  /*getServicePrerequisiteForExistance(descEng,serviceId): Observable<SectorModel> {
    return this.httpClient.get<SectorModel>(this.config.urls.url('sector', descEng,serviceId))
      .map(servicePrereq => {
        this.sectorModel = servicePrereq;
        return this.sectorModel;
      })
      .catch(this.errMsg.parseObservableResponseError);
  }*/
  getSector(id): Observable<SectorModel> {
    return this.httpClient.get<SectorModel>(this.config.urls.url('sector', id)).pipe(
      map(sectordata => {
        this.sectorModel = sectordata;
        return this.sectorModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }
  getSectors(): Observable<SectorModel[]> {
    return this.httpClient.get<SectorModel[]>(this.config.urls.url('sectors')).pipe(
      map(sectorList => this.sectorList = sectorList),
      catchError(this.errMsg.parseObservableResponseError), );
  }
  saveSector(sectorModel: SectorModel): Observable<SectorModel> {
    console.log(sectorModel.SectorId,
      sectorModel.Description,
      sectorModel.DescriptionAlias,
      sectorModel.DescriptionEnglish,
      sectorModel.DescriptionEnglishAlias,
      sectorModel.EconomicSector
    );
    return this.httpClient.post<SectorModel>(this.config.urls.url('sector'), sectorModel).pipe(
      map(SectorData => {
        this.sectorModel = SectorData;
        return this.sectorModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  deleteSector(sectorModel: SectorModel): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('sector', sectorModel.SectorId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError), );
  }
}