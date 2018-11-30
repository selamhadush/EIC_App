import {Injectable} from '@angular/core';
import {ActivityModel} from '../../../../model/activity';
import {SectorModel} from '../../../../model/sector';
import {catchError, map} from 'rxjs/operators';
import {SubSectorModel} from '../../../../model/subSector';
import {AppConfiguration} from '../../../../config/appconfig';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {InvActivityModel} from '../../../../model/invactivity';
import {ErrorMessage} from '../../../../../@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class InvactivityService {
  constructor(private httpClient: HttpClient,
              private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  invActivityModel: InvActivityModel = new InvActivityModel();
  invActivityModelList: InvActivityModel[] = [];

  activityList: ActivityModel[] = [];
  sectorModelList: SectorModel[] = [];
  subSectorModelList: SubSectorModel[] = [];

  /*getServicePrerequisiteForExistance(descEng,serviceId): Observable<ActivityModel> {
    return this.httpClient.get<ActivityModel>(this.config.urls.url('sector', descEng,serviceId))
      .map(servicePrereq => {
        this.activityModel = servicePrereq;
        return this.activityModel;
      })
      .catch(this.errMsg.parseObservableResponseError);
  }*/
  getInvActivity(id): Observable<InvActivityModel> {
    return this.httpClient.get<InvActivityModel>(this.config.urls.url('invactivity', id)).pipe(
      map(invactivityData => {
        this.invActivityModel = invactivityData;
        return this.invActivityModel;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  getInActivitys(): Observable<InvActivityModel[]> {
    return this.httpClient.get<InvActivityModel[]>(this.config.urls.url('invactivitys')).pipe(
      map(invactivityList => this.invActivityModelList = invactivityList),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  saveInvAcitivity(invActivityModel: InvActivityModel): Observable<InvActivityModel> {
    console.log(invActivityModel.InvActivityId,
      invActivityModel.ActivityId,
      invActivityModel.SubSectorId,
      invActivityModel.Description,
      invActivityModel.DescriptionAlias,
      invActivityModel.DescriptionEnglish,
      invActivityModel.DescriptionEnglishAlias,
      invActivityModel.InAddisOromiaAreas,
      invActivityModel.InOtherAreas
    );
    return this.httpClient.post<InvActivityModel>(this.config.urls.url('invactivity'), invActivityModel).pipe(
      map(invActi => {
        this.invActivityModel = invActi;
        return this.invActivityModel;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  deleteInvAcitivity(invActivityModel: InvActivityModel): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('invactivity', invActivityModel.InvActivityId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError),);
  }

  getSectors(): Observable<SectorModel[]> {
    return this.httpClient.get<SectorModel[]>(this.config.urls.url('sectors')).pipe(
      map(serviceList => {
        this.sectorModelList = serviceList;
        return this.sectorModelList;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  getSubSectors(): Observable<SubSectorModel[]> {
    return this.httpClient.get<SubSectorModel[]>(this.config.urls.url('subsectors')).pipe(
      map(subsector => {
        this.subSectorModelList = subsector;
        return this.subSectorModelList;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  getActivitys(): Observable<ActivityModel[]> {
    return this.httpClient.get<ActivityModel[]>(this.config.urls.url('activitys')).pipe(
      map(act => {
        this.activityList = act;
        return this.activityList;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  getTaxExemptionYear(id: number): Observable<InvActivityModel> {
    return this.httpClient.get<InvActivityModel>(this.config.urls.url('taxexemptionyear', id)).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }
}
