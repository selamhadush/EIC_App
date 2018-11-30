///<reference path="../../../../../../../node_modules/rxjs/Observable.d.ts"/>
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ServicePrerequisite } from '../../../../../model/service-prerequisite';
import { ServicePrerequisiteService } from '../servicePrerequisite.service';
import { ServicePrerequisiteModel } from '../../../../../model/service';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { AppConfiguration } from '../../../../../config/appconfig';
import { BusinessTypes } from '../../../../../../@custor/const/consts';
import { determineId } from '../../../../../../@custor/helpers/compare';
import { ErrorMessage } from '../../../../../../@custor/services/errMessageService';
import { BusinessType } from '../../../../../model/lookupData';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'],
  providers: [ServicePrerequisiteService]
})
export class EditServiceComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  servicePrerequisiteSub: Subscription;
  private form: NgForm;
  title: string;
  isNewServicePrerequisite = false;
  servicePrerequisite: ServicePrerequisite;
  businessTypes: BusinessType[] = [];
  servicesModel: ServicePrerequisiteModel[] = [];

  servicePrerequisiteForm: FormGroup;
  loadingIndicator: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private config: AppConfiguration,
    private servicePrerequisiteService: ServicePrerequisiteService, private errMsg: ErrorMessage,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.servicePrerequisite = <ServicePrerequisite>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewServicePrerequisite = true;
      this.title = 'Create a new Service Prerequisite';
      this.getService();
      return;
    }
    if (id) {
      // to-do
      // get the selected customer either through @Input or shared service
      this.getServicePrerequisite(id);
    }
  }

  initStaticData(currentLang) {
    let BusType: BusinessType = new BusinessType();
    BusinessTypes.forEach(pair => {
      BusType = {
        'Id': pair.Id.toString(),
        'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.businessTypes.push(BusType);
    });
  }

  getServicePrerequisite(id) {
    this.isNewServicePrerequisite = false;
    this.loadingIndicator = true;
    this.servicePrerequisiteSub = this.servicePrerequisiteService
      .getServicePrerequisite(id)
      .subscribe(result => {
        this.servicePrerequisite = result;
        this.getService();
        this.updateForm();
      },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    this.servicePrerequisiteForm.patchValue({
      cIsActive: this.servicePrerequisite.IsActive == null ? false : this.servicePrerequisite.IsActive,
      cServiceType: this.servicePrerequisite.ServiceId == null ? 1 : this.servicePrerequisite.ServiceId,
      cBusinessType: this.servicePrerequisite.BusinessType == null ? 1 : this.servicePrerequisite.BusinessType,
      cDescription: this.servicePrerequisite.Description == null ? '' : this.servicePrerequisite.Description.toString(),
      cDescriptionEnglish: this.servicePrerequisite.DescriptionEnglish == null ? '' : this.servicePrerequisite.DescriptionEnglish.toString()
    });
    // },4000);

    this.isNewServicePrerequisite = false;
  }

  initForm() {
    this.servicePrerequisiteForm = this.fb.group({
      cDescriptionEnglish: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      /* Validators.pattern('^[a-zA-Z ]+$')])],*/
      cServiceType: ['1', Validators.required],
      cBusinessType: ['1', Validators.required],
      cIsActive: true,
      cDescription: ['', Validators.required]
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.servicePrerequisiteForm.valid) {
      return;
    }

    if (this.isNewServicePrerequisite) {
      if (this.checkRecordExistance()) {
        this.toastr.show(
          'Record Exist', 'message', {
            closeButton: true
          });
        return;
      }
    }
    this.loadingIndicator = true;
    return this.servicePrerequisiteService.saveServicePrerequisite(
      this.getEditedServicePrerequistie()).subscribe((servicePrerequisite: ServicePrerequisite) => {
        this.saveCompleted(servicePrerequisite);
      },
        err => this.handleError(err));
  }

  checkRecordExistance(): boolean {
    const formModel = this.servicePrerequisiteForm.value;
    this.servicePrerequisiteSub = this.servicePrerequisiteService
      .getServicePrerequisiteForExistance(formModel.cDescriptionEnglish, formModel.cServiceType)
      .subscribe(result => {
        this.servicePrerequisite = result;
      });
    if (this.servicePrerequisite.ServiceId == null) {
      return false;
    } else {
      return true;
    }
  }

  private saveCompleted(servicePrerequisite?: ServicePrerequisite) {
    if (servicePrerequisite) {
      this.servicePrerequisite = servicePrerequisite;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    //this.router.navigate(['serviceprerequisites/list']);
    this.router.navigate(['services-tab']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedServicePrerequistie(): ServicePrerequisite {
    const formModel = this.servicePrerequisiteForm.value;
    return {
      ServicePrerequisiteId: this.isNewServicePrerequisite ? 0 : this.servicePrerequisite.ServicePrerequisiteId,
      Description: formModel.cDescription,
      DescriptionEnglish: formModel.cDescriptionEnglish,
      IsActive: formModel.cIsActive,
      ServiceId: formModel.cServiceType,
      ServiceNameEnglish: null,
      BusinessType: formModel.cBusinessType,
    };
  }

  ngOnDestroy() {
    // this.servicePrerequisiteSub.unsubscribe();
  }

  getService() {
    this.servicePrerequisiteService.getService()
      .subscribe(result => {
        this.servicesModel = result;
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  onBack() {
    this.router.navigate(['services-tab']);
   // this.router.navigate(['serviceprerequisites/list']);
  }

  /*get Description() { return this.servicePrerequisiteForm.get('cDescription'); }
  get DescriptionEnglish() { return this.servicePrerequisiteForm.get('cDescriptionEnglish'); }

  get ServiceId() { return this.servicePrerequisiteForm.get('cServiceType'); }
  get isActive() { return this.servicePrerequisiteForm.get('cIsActive'); }*/
}
