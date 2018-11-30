import {Injectable} from '@angular/core';
import {ProjectModel} from '../model/Project.model';
import {AppConfiguration} from '../config/appconfig';
import {HttpClient} from '@angular/common/http';

import {AddressModel} from '../model/address/Address.model';
import {BaseService} from './Base.service';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {SearchModel} from '../model/search.model';
import {ErrorMessage} from '@custor/services/errMessageService';

@Injectable()
export class ProjectProfileService extends BaseService<ProjectModel> {
  projects: ProjectModel;
  address: AddressModel[] = [];

  constructor(
    protected http: HttpClient,
    protected appConfig: AppConfiguration,
    protected  errMsg: ErrorMessage) {
    super(http, appConfig.urls.url('projects'), errMsg);
  }

  search(resource: SearchModel): Observable<any[]> {
    return this.httpClient.post(this.appConfig.urls.url('search'), resource).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getProjectOnly(): Observable<ProjectModel[]> {
    return this.httpClient.get(this.appConfig.urls.url('projectList')).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }


  getProjectByInvestorId(id: number): Observable<ProjectModel[]> {
    return this.httpClient.get<ProjectModel[]>(this.appConfig.urls.url('ProjectsByInvestorId') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  ProjectsDetail(id: number): Observable<ProjectModel> {
    return this.httpClient.get<ProjectModel[]>(this.appConfig.urls.url('ProjectsDetail') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getProjectOnlyByInvestorId(id: number): Observable<ProjectModel[]> {
    return this.httpClient.get<ProjectModel[]>(this.appConfig.urls.url('ProjectOnlyByInvestorId') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  approveProjectById(id: any): Observable<ProjectModel[]> {
    return this.httpClient.get<ProjectModel[]>(this.appConfig.urls.url('approveProject') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  projectsDetailForLetter(id: any): Observable<ProjectModel> {
    return this.httpClient.get<ProjectModel>(this.appConfig.urls.url('projectsDetailForLetter') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getProjectStatus(id: any): Observable<number> {
    return this.httpClient.get<number>(this.appConfig.urls.url('ProjectsGetProjectStatus') + '/' + id).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  // updateProjectStatus(resource: ProjectDtoModel): Observable<any> {
  //   return this.httpClient.post(this.appConfig.urls.url('updateProjectStatus'), resource).pipe(
  //     catchError(this.errMsg.parseObservableResponseError));
  // }


}
