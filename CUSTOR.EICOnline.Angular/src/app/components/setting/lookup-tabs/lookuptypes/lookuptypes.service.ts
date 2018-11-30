import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorMessage} from "@custor/services/errMessageService";
import {LookuptypesModel} from "../../../../model/lookuptypes";
import {Observable} from "rxjs/index";
import {AppConfiguration} from "../../../../config/appconfig";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LookuptypesService {
  constructor(private httpClient: HttpClient,
              private config: AppConfiguration, private errMsg: ErrorMessage) {
  }
  lookuptypesList: LookuptypesModel[] = [];
  lookuptypesModel: LookuptypesModel = new LookuptypesModel();

  /*getServicePrerequisiteForExistance(descEng,serviceId): Observable<LookuptypesModel> {
    return this.httpClient.get<LookuptypesModel>(this.config.urls.url('lookuptype', descEng,serviceId))
      .map(servicePrereq => {
        this.lookuptypesModel = servicePrereq;
        return this.lookuptypesModel;
      })
      .catch(this.errMsg.parseObservableResponseError);
  }*/
  getlookuptypes(id): Observable<LookuptypesModel> {
    return this.httpClient.get<LookuptypesModel>(this.config.urls.url('lookuptypeById', id)).pipe(
      map(lookuptypedata => {
        this.lookuptypesModel = lookuptypedata;
        return this.lookuptypesModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }
  getlookuptypess(): Observable<LookuptypesModel[]> {
    return this.httpClient.get<LookuptypesModel[]>(this.config.urls.url('lookuptype')).pipe(
      map(lookuptypesList => this.lookuptypesList = lookuptypesList),
      catchError(this.errMsg.parseObservableResponseError), );
  }
  savelookuptypes(lookuptypesModel: LookuptypesModel): Observable<LookuptypesModel> {
    console.log(lookuptypesModel.LookUpTypeId,
      lookuptypesModel.Description,
      lookuptypesModel.DescriptionEnglish
    );
    return this.httpClient.post<LookuptypesModel>(this.config.urls.url('lookuptype'), lookuptypesModel).pipe(
      map(lookuptypesData => {
        this.lookuptypesModel = lookuptypesData;
        return this.lookuptypesModel;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  deletelookuptypes(lookuptypesModel: LookuptypesModel): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('lookuptype', lookuptypesModel.LookUpTypeId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError), );
  }
}
