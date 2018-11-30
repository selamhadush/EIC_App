import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicestepperService } from '../servicestepper.service';
import { determineId } from '@custor/helpers/compare';
import { ErrorMessage } from '@custor/services/errMessageService';
import { ServiceStepModel } from '../../../../../model/ServiceStep.model';
import { ServicePrerequisiteModel } from '../../../../../model/service';
import { AppConfiguration } from '../../../../../config/appconfig';

@Component({
  selector: 'app-edit-servicestepper',
  templateUrl: './edit-servicestepper.component.html',
  styleUrls: ['./edit-servicestepper.component.scss']
})
export class EditServicestepperComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  serviceStepperSub: Subscription;
  title: string;
  isNewServiceStepperSub = false;
  serviceStepper: ServiceStepModel;
  serviceSteppersModel: ServiceStepModel[] = [];
  servicesModel: ServicePrerequisiteModel[] = [];
  serviceStepperForm: FormGroup;
  loadingIndicator: boolean;
  private form: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private config: AppConfiguration,
    private serviceStepperService: ServicestepperService, private errMsg: ErrorMessage,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.serviceStepper = <ServiceStepModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewServiceStepperSub = true;
      this.title = 'Create a new Service Prerequisite';
      this.getService();
      return;
    }
    if (id) {
      // to-do
      // get the selected customer either through @Input or shared service
      this.getServiceStepper(id);
    }
  }

  initStaticData(currentLang) {
  }

  getServiceStepper(id) {
    this.isNewServiceStepperSub = false;
    this.loadingIndicator = true;
    this.serviceStepperSub = this.serviceStepperService
      .getServiceStep(id)
      .subscribe(result => {
        this.serviceStepper = result;
        console.log(this.serviceStepper);
        this.getService();
        this.updateForm();
      },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    this.serviceStepperForm.patchValue({
      cServiceType: this.serviceStepper.ServiceId == null ? 1 : this.serviceStepper.ServiceId,
      cName: this.serviceStepper.Name == null ? '' : this.serviceStepper.Name.toString(),
      cNameEnglish: this.serviceStepper.NameEnglish == null ? '' : this.serviceStepper.NameEnglish.toString(),
      cIsActive: this.serviceStepper.IsActive == null ? false : this.serviceStepper.IsActive
    });
    // },4000);

    this.isNewServiceStepperSub = false;
  }

  initForm() {
    this.serviceStepperForm = this.fb.group({
      cNameEnglish: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      /* Validators.pattern('^[a-zA-Z ]+$')])],*/
      cServiceType: ['1', Validators.required],
      cIsActive: true,
      cName: ['', Validators.required]
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.serviceStepperForm.valid) {
      return;
    }

    // if (this.isNewServiceStepperSub) {
    //   if (this.checkRecordExistance()) {
    //     this.toastr.show(
    //       'Record Exist', 'message', {
    //         closeButton: true
    //       });
    //     return;
    //   }
    // }
    this.loadingIndicator = true;
    return this.serviceStepperService.saveServiceStep(
      this.getEditedServiceStepper()).subscribe((serviceStepper: ServiceStepModel) => {
        this.saveCompleted(serviceStepper);
      },
        err => this.handleError(err));
  }

  // checkRecordExistance(): boolean {
  //   const formModel = this.serviceStepperForm.value;
  //   this.serviceStepperSub = this.serviceStepperService
  //     .subscribe(result => {
  //       this.serviceStepper = result;
  //     });
  //   if (this.serviceStepper.ServiceId == null) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  //
  // }

  ngOnDestroy() {
    // this.serviceStepperSub.unsubscribe();
  }

  getService() {
    this.serviceStepperService.getService()
      .subscribe(result => {
        this.servicesModel = result;
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  onBack() {
    //this.router.navigate(['servicesteppers/list']);
    this.router.navigate(['services-tab']);
  }

  private saveCompleted(serviceStepper?: ServiceStepModel) {
    if (serviceStepper) {
      this.serviceStepper = serviceStepper;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    //this.router.navigate(['servicesteppers/list']);
    this.router.navigate(['services-tab']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedServiceStepper(): ServiceStepModel {
    const formModel = this.serviceStepperForm.value;
    return {
      ServiceStepId: this.isNewServiceStepperSub ? 0 : this.serviceStepper.ServiceStepId,
      Name: formModel.cName,
      NameEnglish: formModel.cNameEnglish,
      IsActive: formModel.cIsActive === null ? false : formModel.cIsActive,
      ServiceId: formModel.cServiceType,
      LegalStatusId: null,
      Service: null,
    };
  }
}
