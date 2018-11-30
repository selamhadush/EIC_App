import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { AppConfiguration } from '../../../../config/appconfig';
import { Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { SubSectorModel } from '../../../../model/subSector';
import { SectorModel } from '../../../../model/sector';
import { ErrorMessage } from '../../../../../@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class SubsectorService {
  constructor(private httpClient: HttpClient,
    private config: AppConfiguration, private errMsg: ErrorMessage) {
  }
  subsectorList: SubSectorModel[] = [];
  subSectorModel: SubSectorModel = new SubSectorModel();
  sectorModelList: SectorModel[] = [];

  /*getServicePrerequisiteForExistance(descEng,serviceId): Observable<SubSectorModel> {
    return this.httpClient.get<SubSectorModel>(this.config.urls.url('sector', descEng,serviceId))
      .map(servicePrereq => {
        this.subSectorModel = servicePrereq;
        return this.subSectorModel;
      })
      .catch(this.errMsg.parseObservableResponseError);
  }*/
  getSubSector(id): Observable<SubSectorModel> {
    return this.httpClient.get<SubSectorModel>(this.config.urls.url('subsector', id)).pipe(
      map(sectordata => {
        this.subSectorModel = sectordata;
        return this.subSectorModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }
  getSubSectors(): Observable<SubSectorModel[]> {
    return this.httpClient.get<SubSectorModel[]>(this.config.urls.url('subsectors')).pipe(
      map(subsectorList => this.subsectorList = subsectorList),
      catchError(this.errMsg.parseObservableResponseError), );
  }
  saveSubSector(subSectorModel: SubSectorModel): Observable<SubSectorModel> {
    console.log(subSectorModel.SectorId,
      subSectorModel.Description,
      subSectorModel.DescriptionAlias,
      subSectorModel.DescriptionEnglish,
      subSectorModel.DescriptionEnglishAlias,
      subSectorModel.SectorId
    );
    return this.httpClient.post<SubSectorModel>(this.config.urls.url('subsector'), subSectorModel).pipe(
      map(SubSectorData => {
        this.subSectorModel = SubSectorData;
        return this.subSectorModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  deleteSubSector(subSectorModel: SubSectorModel): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('subsector', subSectorModel.SubSectorId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError), );
  }
  getSector(): Observable<SectorModel[]> {
    return this.httpClient.get<SectorModel[]>(this.config.urls.url('sectors')).pipe(
      map(serviceList => {
        this.sectorModelList = serviceList;
        return this.sectorModelList;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }
}