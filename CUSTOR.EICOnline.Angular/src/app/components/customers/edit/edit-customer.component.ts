import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Customer } from '../../../model/customer';
import { Subscription } from 'rxjs';
import { Gender, Lookup, MaritalStatus } from '../../../model/lookupData';
import { Kebele, Region, Woreda, Zone } from '../../../model/address';
import { ToastrService } from 'ngx-toastr';

import { CustomerService } from '../customerService';
import { AppConfiguration } from '../../../config/appconfig';
import { ErrorMessage } from '../../../../@custor/services/errMessageService';
import { GENDERS } from '../../../const/consts';
import { MARITAL_STATUSES } from '../../../../@custor/const/consts';
import { determineId } from '../../../../@custor/helpers/compare';
import { DATE_REGEX, strToDate } from '../../../../@custor/validation/date.helper';

// import { SharedModule } from "../../@custor/modules/shared.module";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  providers: [CustomerService]
})
export class EditCustomerComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  custSub: Subscription;
  private form: NgForm;
  title: string;
  isNewCustomer = false;

  customer: Customer;
  countries: Lookup[] = [];
  lookups: Lookup[] = [];
  regions: Region[] = [];
  zones: Zone[] = [];
  filteredZones: Zone[] = [];
  woredas: Woreda[] = [];
  filteredWoredas: Woreda[] = [];
  kebeles: Kebele[] = [];
  filteredKebeles: Kebele[] = [];
  // isEditMode = false;
  customerForm: FormGroup;
  loadingIndicator: boolean;
  genders: Gender[] = [];
  maritalStatuses: MaritalStatus[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private config: AppConfiguration,
    private custService: CustomerService, private errMsg: ErrorMessage,
    private toastr: ToastrService, private datePipe: DatePipe,
    private fb: FormBuilder) {
    // create an empty object from the Customer model
    this.customer = <Customer>{};

    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewCustomer = true;
      this.title = 'Create a new Customer';
      this.fillAddressLookups();
      return;
    }
    if (id) {
      //to-do
      //get the selected customer either through @Input or shared service
      this.getCustomer(id);
    }
  }

  initStaticData(currentLang) {
    let gender: Gender = new Gender();
    GENDERS.forEach(pair => {
      gender = { 'Id': pair.Id.toString(), 'Desc': (currentLang === 'am' ? pair.Description : pair.description) };
      this.genders.push(gender);
    });
    let marStatus: MaritalStatus = new MaritalStatus();
    MARITAL_STATUSES.forEach(pair => {
      marStatus = { 'Id': pair.Id.toString(), 'Desc': (currentLang === 'am' ? pair.Description : pair.description) };
      this.maritalStatuses.push(marStatus);
    });
    this.getLookups();
  }

  ngOnDestroy() {
    this.custSub.unsubscribe();
  }

  getCustomer(id) {
    this.isNewCustomer = false;
    this.loadingIndicator = true;
    this.custSub = this.custService
      .getCustomer(id)
      .subscribe(result => {
        this.customer = result;
        this.fillAddressLookups();
        this.updateForm();
      },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  fillAddressLookups() {
    //to-do
    //bring all in one go
    //caching
    this.getRegions();
    this.getAllZones();
    this.getAllWoredas();
    this.getAllKebeles();
  }

  getLookups() {
    this.custService.getLookups()
      .subscribe(result => {
        this.countries = result;
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getRegions() {
    this.custService.getRegions()
      .subscribe(result => {
        this.regions = result;
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getAllZones() {
    this.custService.getAllZones()
      .subscribe(result => {
        this.zones = result;
        this.filterRegion(this.customer.Region);
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getAllWoredas() {
    this.custService.getAllWoredas()
      .subscribe(result => {
        this.woredas = result;
        this.filterZone(this.customer.Zone);
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getAllKebeles() {
    this.custService.getAllKebeles()
      .subscribe(result => {
        this.kebeles = result;
        this.filterWoreda(this.customer.Woreda);
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  initForm() {
    this.customerForm = this.fb.group({
      cTitle: ['', Validators.required],
      cFirstName: ['', Validators.compose([Validators.required, Validators.minLength(2),
      Validators.pattern('^[a-zA-Z ]+$')])],
      cFatherName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      cGrandName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      cNationality: ['1', Validators.required],
      cMaritalStatus: ['', Validators.required],
      cGender: ['', Validators.required],
      cBirthDate: ['', Validators.compose([Validators.required, Validators.pattern(DATE_REGEX)])],
      cIsCompany: false,
      cRegion: ['', Validators.required],
      cZone: ['', Validators.required],
      cWoreda: ['', Validators.required],
      cKebele: ['', Validators.required]
    });
  }

  updateForm() {
    const _shortDate = 'dd/MM/yyyy';

    // setTimeout(() => //expensive operation - due to a bug in mat-select. To be improved!
    // {
    this.customerForm.setValue({
      cTitle: this.customer.Title,
      cFirstName: this.customer.FirstName || '',
      cFatherName: this.customer.FatherName || '',
      cGrandName: this.customer.GrandName || '',
      cIsCompany: this.customer.IsCompany,
      cNationality: this.customer.Nationality == null ? '' : this.customer.Nationality.toString(),
      cRegion: this.customer.Region == null ? '' : this.customer.Region.toString(),
      cZone: this.customer.Zone == null ? '' : this.customer.Zone.toString(),
      cWoreda: this.customer.Woreda == null ? '' : this.customer.Woreda.toString(),
      cKebele: this.customer.Kebele == null ? '' : this.customer.Kebele.toString(),
      cBirthDate: this.datePipe.transform(this.customer.BirthDate, _shortDate),
      cMaritalStatus: this.customer.MaritalStatus == null ? '' : this.customer.MaritalStatus.toString(),
      cGender: this.customer.Gender == null ? '' : this.customer.Gender.toString()
    });
    // },2000);

    this.isNewCustomer = false;
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.customerForm.valid) {
      return;
    }

    this.loadingIndicator = true;
    return this.custService.saveCustomer(this.getEditedCustomer())
      .subscribe((customer: Customer) => {
        this.saveCompleted(customer);
      },
        err => this.handleError(err)
      );
  }

  private saveCompleted(customer?: Customer) {
    if (customer) {
      this.customer = customer;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    this.router.navigate(['customers/list']);
  }

  private handleError(err) {
    // alert (this.errMsg.response.toString());

    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
    // console.log(err.message);
  }

  private getEditedCustomer(): Customer {
    const formModel = this.customerForm.value;

    // alert (strToDate(formModel.cBirthDate));
    return {
      CustomerId: this.isNewCustomer ? null : this.customer.CustomerId,
      Title: formModel.cTitle,
      FirstName: formModel.cFirstName,
      FatherName: formModel.cFatherName,
      GrandName: formModel.cGrandName,
      Nationality: formModel.cNationality,
      IsCompany: formModel.cIsCompany,
      MaritalStatus: formModel.cMaritalStatus,
      BirthDate: strToDate(formModel.cBirthDate),
      Gender: formModel.cGender,
      Region: formModel.cRegion,
      Zone: formModel.cZone,
      Woreda: formModel.cWoreda,
      Kebele: formModel.cKebele
    };
  }

  filterRegion(regionCode: string) {
    if (!regionCode) {
      return;
    }
    this.filteredZones = null;
    this.filteredKebeles = null;
    this.filteredWoredas = null;

    this.filteredZones = this.zones.filter((item) => {
      return item.RegionId === regionCode;
    });
    // this.customerForm.controls['cZone'].patchValue("0");
  }

  filterZone(zoneCode: string) {
    if (!zoneCode) {
      return;
    }
    this.filteredKebeles = null;
    this.filteredWoredas = null;

    this.filteredWoredas = this.woredas.filter((item) => {
      return item.ZoneId === zoneCode;
    });
  }

  filterWoreda(woredaCode: string) {
    if (!woredaCode) {
      return;
    }
    this.filteredKebeles = this.kebeles.filter((item) => {
      return item.WoredaId === woredaCode;
    });
  }

  onBack() {
    this.router.navigate(['customers/list']);
  }

  get customerTitle() {
    return this.customerForm.get('cTitle');
  }

  get firstName() {
    return this.customerForm.get('cFirstName');
  }

  get fatherName() {
    return this.customerForm.get('cFatherName');
  }

  get grandName() {
    return this.customerForm.get('cGrandName');
  }

  get isCompany() {
    return this.customerForm.get('cIsCompany');
  }

  get nationality() {
    return this.customerForm.get('cNationality');
  }

  get maritalStatus() {
    return this.customerForm.get('cMaritalStatus');
  }

  get gender() {
    return this.customerForm.get('cGender');
  }

  get birthDate() {
    return this.customerForm.get('cBirthDate');
  }

  get region() {
    return this.customerForm.get('cRegion');
  }

  get zone() {
    return this.customerForm.get('cZone');
  }

  get woreda() {
    return this.customerForm.get('cWoreda');
  }

  get kebele() {
    return this.customerForm.get('cKebele');
  }

  // get floatLabels(): string { return this.isEditMode ? 'auto' : 'always'; }
}
