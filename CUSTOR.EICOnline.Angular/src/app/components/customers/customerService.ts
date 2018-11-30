import { catchError, map } from 'rxjs/operators';
import { Injectable, Input } from '@angular/core';
import { Customer } from '../../model/customer';
import { AppConfiguration } from '../../config/appconfig';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Lookup } from '../../model/lookupData';
import { Region, Zone, Woreda, Kebele } from '../../model/address';
import { ErrorMessage } from '../../../@custor/services/errMessageService';

@Injectable()
export class CustomerService {
  kebeleList: Kebele[];
  allKebeleList: Kebele[];
  woredaList: Woreda[];
  zoneList: Zone[];
  allZoneList: Zone[];
  allWoredaList: Woreda[];

  constructor(private httpClient: HttpClient,
    private config: AppConfiguration, private errMsg: ErrorMessage) {
  }

  customerList: Customer[] = [];
  customer: Customer = new Customer();
  lookupList: Lookup[] = [];
  regionList: Region[];

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.config.urls.url('customers')).pipe(
      map(customerList => this.customerList = customerList),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getLookups(): Observable<Lookup[]> {
    return this.httpClient.get<Lookup[]>(this.config.urls.url('lookups')).pipe(
      map(lookupList => this.lookupList = lookupList),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getCustomer(id): Observable<Customer> {
    return this.httpClient.get<Customer>(this.config.urls.url('customer', id)).pipe(
      map(cust => {
        this.customer = cust;
        return this.customer;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    console.log(customer.CustomerId,
      customer.FirstName,
      customer.FatherName,
      customer.GrandName,
      customer.Gender,
      customer.IsCompany,
      customer.Region,
      customer.Zone,
      customer.Woreda,
      customer.Kebele,
      customer.MaritalStatus,
      customer.Nationality,
      customer.Title,
      customer.BirthDate
    );
    return this.httpClient.post<Customer>(this.config.urls.url('customer'), customer).pipe(
      map(cust => {
        this.customer = cust;
        return this.customer;
      }),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  deleteCustomer(customer: Customer): Observable<any> {
    return this.httpClient.delete<boolean>(this.config.urls.url('customer', customer.CustomerId)).pipe(
      map(result => {
        return result;
      }),
      catchError(this.errMsg.parsePromiseResponseError), );
  }

  getRegions(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(this.config.urls.url('regions')).pipe(
      map(regionList => this.regionList = regionList),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getAllZones(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.config.urls.url('zones')).pipe(
      map(zoneList => this.allZoneList = zoneList),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getZones(id: string): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.config.urls.url('zones', id)).pipe(
      map(zoneList => this.zoneList = zoneList),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getWoredas(id: string): Observable<Woreda[]> {
    return this.httpClient.get<Woreda[]>(this.config.urls.url('woredas', id)).pipe(
      map(woredaList => this.woredaList = woredaList),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getAllWoredas(): Observable<Woreda[]> {
    return this.httpClient.get<Woreda[]>(this.config.urls.url('woredas')).pipe(
      map(woredaList => this.allWoredaList = woredaList),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getKebeles(id: string): Observable<Kebele[]> {
    return this.httpClient.get<Kebele[]>(this.config.urls.url('kebeles', id)).pipe(
      map(kebeleList => this.kebeleList = kebeleList),
      catchError(this.errMsg.parseObservableResponseError), );
  }

  getAllKebeles(): Observable<Kebele[]> {
    return this.httpClient.get<Kebele[]>(this.config.urls.url('kebeles')).pipe(
      map(kebeleList => this.allKebeleList = kebeleList),
      catchError(this.errMsg.parseObservableResponseError), );
  }
}