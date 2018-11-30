import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ServicetariffService } from '../servicetariff.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { ErrorMessage } from '@custor/services/errMessageService';
import { determineId } from '@custor/helpers/compare';
import { AppConfiguration } from '../../../../../config/appconfig';
import { ServiceTariffModel, ServiceTariffViewModel } from '../../../../../model/servicetariff';
import { ServicePrerequisiteModel } from '../../../../../model/service';
import { TariffModel } from '../../../../../model/tariff';

@Component({
  selector: 'app-edit.servicetariff',
  templateUrl: './edit-servicetariff.component.html',
  styleUrls: ['./edit-servicetariff.component.css'],
  providers: [ServicetariffService]
})
export class EditServicetariffComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  serviceTariffsSub: Subscription;
  isNewServiceTariff = false;
  serviceTariffs: ServiceTariffModel;
  serviceTariffLists: ServiceTariffViewModel[] = [];
  serviceModel: ServicePrerequisiteModel[] = [];
  tariffModel: TariffModel[] = [];
  TariffIds: number[] = [];
  serviceTariffForm: FormGroup;
  loadingIndicator: boolean;
  @ViewChild('cTariffType') selectElRef;

  private form: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private config: AppConfiguration,
    private servicetariffService: ServicetariffService, private errMsg: ErrorMessage,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.serviceTariffs = <ServiceTariffModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    this.getService();
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    if (id < 1) {
      this.isNewServiceTariff = true;
      /*this.title = 'Create a new Service';
      this.getService();*/
      return;
    }
    if (id) {
      this.getServiceTariff(id);
    }
  }

  initStaticData(currentLang) {
  }

  // ngAfterViewInit() {
  //   this.updateSelectList();
  // }
  //
  // updateSelectList() {
  //   const options = this.selectElRef.nativeElement.options;
  //   for (let i = 0; i < options.length; i++) {
  //     options[i].selected = this.TariffIds.indexOf(options[i].value) > -1;
  //   }
  // }

  getServiceTariff(id) {
   // console.log(id);
    this.isNewServiceTariff = false;
    this.loadingIndicator = true;
    this.serviceTariffsSub =
      this.servicetariffService
        .getServiceTariff(id)
        .subscribe((result: any) => {
          //console.log(result);
          this.serviceTariffLists = result;
          //console.log(this.serviceTariffLists);
          // this.onSelectedTariff();
          this.updateForm();
          this.getTariff();
        },
          error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    //console.log('i ma here');
    this.serviceTariffForm.patchValue({
      cServiceType: this.serviceTariffLists[0].ServiceId,
      // cTariffType:  this.serviceTariffLists.TariffId
    });
    // },4000);
    this.isNewServiceTariff = false;
  }

  getService() {
    this.servicetariffService.getService()
      .subscribe(result => {
        this.serviceModel = result;
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getTariff() {
    this.servicetariffService.getTariff()
      .subscribe(result => {
        this.checkIfSelected(result);
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  checkIfSelected(result: TariffModel[]) {
    this.tariffModel = result;
    for (let i = 0; i < this.serviceTariffLists.length; i++) {
      for (let j = 0; j < this.tariffModel.length; j++) {
        if (this.tariffModel[j].TariffId === this.serviceTariffLists[i].TariffId) {
          this.tariffModel[j].selected = true;
          // console.log(this.tariffModel[j]);
        } else {
          if (this.tariffModel[j].selected !== true) {
            this.tariffModel[j].selected = false;
          }
        }
      }
    }
    //console.log(this.tariffModel);
  }

  initForm() {
    this.serviceTariffForm = this.fb.group({
      cTariffType: ['0', Validators.required],
      cServiceType: ['0', Validators.required]
    });
  }

  onTariffListControlChanged(list: number) {
    this.TariffIds.push(list);
  }

  /* checkRecordExistance(): boolean {
     const formModel = this.serviceTariffForm.value;
     this.servicesSub = this.servicesService
       .getServices(formModel.cServiceNameEnglish, formModel.cServiceType)
       .subscribe(result => {
         this.serviceTariffs = result
       })
     if (this.serviceTariffs.ServiceId == null) {
       return false;
     } else {
       return true;
     }
   }*/

  public onSubmit() {
    if (!this.serviceTariffForm.valid) {
      return;
    }

    if (this.isNewServiceTariff) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.servicetariffService.saveServiceTariff(
      this.getEditedServiceTariff()).subscribe((servicetariffs: ServiceTariffModel) => {
        //console.log(servicetariffs);
        this.saveCompleted(servicetariffs);
      },
        err => this.handleError(err));
  }

  compareIds(id1: any, id2: any):
    boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  ngOnDestroy() {
    // this.serviceTariffsSub.unsubscribe();
  }

  onBack() {
    //this.router.navigate(['servicetariffs/list']);
    this.router.navigate(['services-tab']);
  }

  saveCompleted(services?: ServiceTariffModel) {
    if (services) {
      this.serviceTariffs = services;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
   // this.router.navigate(['servicetariffs/list']);
    this.router.navigate(['services-tab']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedServiceTariff(): ServiceTariffModel {
    const formModel = this.serviceTariffForm.value;
    return {
      ServiceTariffId: this.isNewServiceTariff ? 0 : this.serviceTariffs.ServiceTariffId,
      ServiceId: formModel.cServiceType,
      TariffId: this.TariffIds,
      NameEnglish: null,
      Fee: null
    };
  }

  // private getServiceTariffsNew(): ServiceTariffModel {
  //   const formModel = this.serviceTariffForm.value;
  //   return {
  //     ServiceTariffId: this.isNewServiceTariff ? null : this.serviceTariffs.ServiceTariffId,
  //     ServiceId: formModel.cServiceType,
  //     TariffId: this.TariffIds,
  //
  //   };
  // }
}
