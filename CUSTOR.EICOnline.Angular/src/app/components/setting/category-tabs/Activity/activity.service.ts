import {Injectable} from '@angular/core';
import {ActivityModel} from '../../../../model/activity';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../../../../config/appconfig';
import {SubSectorModel} from '../../../../model/subSector';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import {SectorModel} from '../../../../model/sector';
import {ErrorMessage} from '../../../../../@custor/services/errMessageService';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private httpClient: HttpClient,
              private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  activityList: ActivityModel[] = [];
  activityModel: ActivityModel = new ActivityModel();
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
  getActivity(id): Observable<ActivityModel> {
    return this.httpClient.get<ActivityModel>(this.config.urls.url('activity', id)).pipe(
      map((activityData: ActivityModel) => {
        this.activityModel = activityData;
        return this.activityModel;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  getActivitys(): Observable<ActivityModel[]> {
    return this.httpClient.get<ActivityModel[]>(this.config.urls.url('activitys')).pipe(
      map(activityList => this.activityList = activityList),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  saveAcitivity(activityModel: ActivityModel): Observable<ActivityModel> {
    console.log(activityModel.ActivityId,
      activityModel.Description,
      activityModel.DescriptionAlias,
      activityModel.DescriptionEnglish,
      activityModel.DescriptionEnglishAlias,
      activityModel.SubSectorId
    );
    return this.httpClient.post<ActivityModel>(this.config.urls.url('activity'), activityModel).pipe(
      map(SubSectorData => {
        this.activityModel = SubSectorData;
        return this.activityModel;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  deleteAcitivity(activityModel: ActivityModel): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('activity', activityModel.SubSectorId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError),);
  }

  getSector(): Observable<SectorModel[]> {
    return this.httpClient.get<SectorModel[]>(this.config.urls.url('sectors')).pipe(
      map(serviceList => {
        this.sectorModelList = serviceList;
        return this.sectorModelList;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  getSubSector(): Observable<SubSectorModel[]> {
    return this.httpClient.get<SubSectorModel[]>(this.config.urls.url('subsectors')).pipe(
      map(subsector => {
        this.subSectorModelList = subsector;
        return this.subSectorModelList;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }
}