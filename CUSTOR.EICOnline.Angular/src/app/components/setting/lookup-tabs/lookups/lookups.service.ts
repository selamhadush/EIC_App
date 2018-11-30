import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorMessage} from '@custor/services/errMessageService';
import {LookupsModel} from '../../../../model/lookups';
import {LookuptypesModel} from '../../../../model/lookuptypes';
import {Observable} from 'rxjs/index';
import {AppConfiguration} from '../../../../config/appconfig';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  constructor(private httpClient: HttpClient,
              private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  lookupsList: LookupsModel[] = [];
  subLookuptypesModel: LookupsModel = new LookupsModel();
  lookuptypesModelList: LookuptypesModel[] = [];

  getLookup(id): Observable<LookupsModel> {
    return this.httpClient.get<LookupsModel>(this.config.urls.url('lookupById', id)).pipe(
      map(lookuprdata => {
        this.subLookuptypesModel = lookuprdata;
        return this.subLookuptypesModel;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }


  getLookups(): Observable<LookupsModel[]> {
    return this.httpClient.get<LookupsModel[]>(this.config.urls.url('lookup')).pipe(
      map(lookupsList => this.lookupsList = lookupsList),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  saveLookups(subLookuptypesModel: LookupsModel): Observable<LookupsModel> {
    console.log(subLookuptypesModel.LookupId,
      subLookuptypesModel.Amharic,
      subLookuptypesModel.English,
      subLookuptypesModel.LookUpTypeId
    );
    return this.httpClient.post<LookupsModel>(this.config.urls.url('lookup'), subLookuptypesModel).pipe(
      map(LookupsData => {
        this.subLookuptypesModel = LookupsData;
        return this.subLookuptypesModel;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }

  deleteLookups(subLookuptypesModel: LookupsModel): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('lookup', subLookuptypesModel.LookupId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError),);
  }

  getLookuptype(): Observable<LookuptypesModel[]> {
    return this.httpClient.get<LookuptypesModel[]>(this.config.urls.url('lookuptype')).pipe(
      map(lookuptypesList => {
        this.lookuptypesModelList = lookuptypesList;
        return this.lookuptypesModelList;
      }),
      catchError(this.errMsg.parseObservableResponseError),);
  }
}
