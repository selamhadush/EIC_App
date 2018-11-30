import { catchError, map } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from '../../config/appconfig';
import { KebeleModel } from '../../model/address/Kebele.model';
import { WoredaModel } from '../../model/address/Woreda.model';
import { ZoneModel } from '../../model/address/Zone.model';
import { RegionModel } from '../../model/address/Region.model';
import { AddressModel } from '../../model/address/Address.model';
import { TownModel } from '../../model/address/Town.model';
import { NationalityModel } from '../../model/address/NationalityModel';
import { Observable } from 'rxjs/internal/Observable';
import { ErrorMessage } from '../../../@custor/services/errMessageService';

@Injectable()
export class AddressService implements OnInit {
  addressLookUp: AddressModel;
  kebeleList: KebeleModel[];
  allKebeleList: KebeleModel[];
  woredaList: WoredaModel[];
  zoneList: ZoneModel[];
  townList: TownModel[];
  allZoneList: ZoneModel[];
  allTownList: TownModel[];
  allWoredaList: WoredaModel[];
  regionList: RegionModel[];
  NationList: NationalityModel[];
  lang: string;

  constructor(private httpClient: HttpClient,
    private config: AppConfiguration,
    private errMsg: ErrorMessage) {

  }

  ngOnInit(): void {
    this.lang = '/et';
  }

  saveAddress(address: AddressModel): Observable<AddressModel> {
    return this.httpClient.post<AddressModel>(this.config.urls.url('address'), address).pipe(
      map(addressLookup => this.addressLookUp = addressLookup),
      catchError(this.errMsg.parseObservableResponseError)
    );
  }

  updateAddress(resource, id) {
    console.log(resource);
    return this.httpClient.put(this.config.urls.url('address') + '/' + id, resource).pipe(
      catchError(this.errMsg.parseObservableResponseError));
  }

  getRegions(): Observable<RegionModel[]> {
    return this.httpClient.get<RegionModel[]>(this.config.urls.url('regions') + '/en').pipe(
      map(regionList => this.regionList = regionList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getAllZones(): Observable<ZoneModel[]> {
    return this.httpClient.get<ZoneModel[]>(this.config.urls.url('zones') + '/en').pipe(
      map(zoneList => this.allZoneList = zoneList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getAllTowns(): Observable<TownModel[]> {
    return this.httpClient.get<TownModel[]>(this.config.urls.url('towns' + '/en')).pipe(
      map(result => this.allTownList = result),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getZones(id: string): Observable<ZoneModel[]> {
    return this.httpClient.get<ZoneModel[]>(this.config.urls.url('zones' + '/en', id)).pipe(
      map(zoneList => this.zoneList = zoneList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getWoredas(id: string): Observable<WoredaModel[]> {
    return this.httpClient.get<WoredaModel[]>(this.config.urls.url('woredas' + '/en', id)).pipe(
      map(woredaList => this.woredaList = woredaList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getAllWoredas(): Observable<WoredaModel[]> {
    return this.httpClient.get<WoredaModel[]>(this.config.urls.url('woredas') + '/en').pipe(
      map(woredaList => this.allWoredaList = woredaList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getKebeles(id: string): Observable<KebeleModel[]> {
    return this.httpClient.get<KebeleModel[]>(this.config.urls.url('kebeles', id)).pipe(
      map(kebeleList => this.kebeleList = kebeleList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getKebelesByWoreda(id: string): Observable<KebeleModel[]> {
    return this.httpClient.get<KebeleModel[]>(this.config.urls.url('kebeles', 'en', id)).pipe(
      map(kebeleList => this.kebeleList = kebeleList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getAllKebeles(): Observable<KebeleModel[]> {
    return this.httpClient.get<KebeleModel[]>(this.config.urls.url('kebeles' + '/en')).pipe(
      map(kebeleList => this.allKebeleList = kebeleList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getNationality(): Observable<NationalityModel[]> {
    return this.httpClient.get<NationalityModel[]>(this.config.urls.url('nationality')).pipe(
      map(countryList => this.NationList = countryList),
      catchError(this.errMsg.parseObservableResponseError));
  }

  getAddress(id: number): Observable<AddressModel> {
    return this.httpClient.get<AddressModel>(this.config.urls.url('address', id)).pipe(
      map((address: AddressModel) => {
        return this.addressLookUp = address;
      }),
      catchError(this.errMsg.parseObservableResponseError));
  }
}
