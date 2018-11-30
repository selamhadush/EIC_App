import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {SectorModel} from '../model/Sector.model';
import {Observable} from 'rxjs';
import {AppConfiguration} from '../config/appconfig';
import {HttpClient} from '@angular/common/http';
import {ErrorMessage} from '../../@custor/services/errMessageService';

@Injectable()
export class SectorService {
  constructor(private httpClient: HttpClient,
              private config: AppConfiguration,
              private errMsg: ErrorMessage) {
  }

  getSector(): Observable<SectorModel[]> {
    return this.httpClient.get<SectorModel>(this.config.urls.url('sectors')).pipe(
      map(result => {
        return result;
      }), catchError(this.errMsg.parseObservableResponseError));
  }

  getAllSubSector() {
    return this.httpClient.get(this.config.urls.url('subsectors')).pipe(
      map((subSector: Response) => {
        return subSector;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }
}