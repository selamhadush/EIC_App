import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ServicesService } from '../services.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ServicePrerequisiteModel } from '../../../../../model/service';
import { AppConfiguration } from '../../../../../config/appconfig';
import { ErrorMessage } from '@custor/services/errMessageService';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ServicesService]
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  servicesSub: Subscription;
  private form: NgForm;
  title: string;
  isNewServices = false;
  services: ServicePrerequisiteModel;

  servicesForm: FormGroup;
  loadingIndicator: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private config: AppConfiguration,
    private servicesService: ServicesService, private errMsg: ErrorMessage,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.services = <ServicePrerequisiteModel>{};
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewServices = true;
      this.title = 'Create a new Service';
      /*this.getService();*/
      return;
    }
    if (id) {
      // to-do
      // get the selected customer either through @Input or shared service
      this.getServices(id);
    }
  }

  initStaticData(currentLang) {
  }

  getServices(id) {
    this.isNewServices = false;
    this.loadingIndicator = true;
    this.servicesSub = this.servicesService
      .getService(id)
      .subscribe(result => {
        this.services = result;
        this.updateForm();
      },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    this.servicesForm.setValue({
      cIsActive: this.services.IsActive,
      /*cServiceType: this.services.ServiceId == null ? 1 : this.services.ServiceId,*/
      cName: this.services.Name == null ? '' : this.services.Name.toString(),
      cDisplayName: this.services.DisplayName == null ? '' : this.services.DisplayName.toString(),
      cNameEnglish: this.services.NameEnglish == null ? '' : this.services.NameEnglish.toString(),
      cDisplayNameEnglish: this.services.DisplayNameEnglish == null ? '' : this.services.DisplayNameEnglish.toString()
    });
    // },4000);

    this.isNewServices = false;
  }

  initForm() {
    this.servicesForm = this.fb.group({
      cIsActive: true,
      cName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50),
      Validators.pattern('^([ \u1200-\u137F])+$')])],
      cDisplayName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50),
      Validators.pattern('^([ \u1200-\u137F])+$')])],
      cDisplayNameEnglish: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(62),
      Validators.pattern('^[a-zA-Z /]+$')])],
      cNameEnglish: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(62),
      Validators.pattern('^[a-zA-Z /]+$')])]
    });
  }

  public onSubmit() {
    if (!this.servicesForm.valid) {
      return;
    }

    if (this.isNewServices) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.servicesService.saveService(
      this.getEditedService()).subscribe((services: ServicePrerequisiteModel) => {
        this.saveCompleted(services);
      },
        err => this.handleError(err));
  }

  private saveCompleted(services?: ServicePrerequisiteModel) {
    if (services) {
      this.services = services;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    //this.router.navigate(['services/list']);
    this.router.navigate(['services-tab']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedService(): ServicePrerequisiteModel {
    const formModel = this.servicesForm.value;
    return {
      ServiceId: this.isNewServices ? 0 : this.services.ServiceId,
      Name: formModel.cName,
      NameEnglish: formModel.cNameEnglish,
      DisplayName: formModel.cDisplayName,
      DisplayNameEnglish: formModel.cDisplayNameEnglish,
      IsActive: formModel.cIsActive,
    };
  }

  ngOnDestroy() {
  //  this.servicesSub.unsubscribe();
  }

  onBack() {
    this.router.navigate(['services-tab']);
  }

  get Name() {
    return this.servicesForm.get('cName');
  }

  get DisplayName() {
    return this.servicesForm.get('cDisplayName');
  }

  get DisplayNameEnglish() {
    return this.servicesForm.get('cDisplayNameEnglish');
  }

  get NameEnglish() {
    return this.servicesForm.get('cNameEnglish');
  }
}
