import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {TariffService} from '../tariff.service';

import {Quantitys, TariffModes} from '@custor/const/consts';
import {ErrorMessage} from '@custor/services/errMessageService';
import {determineId} from '@custor/helpers/compare';
import {Quantity, TariffMode} from '../../../../../model/lookupData';
import {Subscription} from 'rxjs';
import {TariffModel} from '../../../../../model/tariff';
import {AppConfiguration} from '../../../../../config/appconfig';

@Component({
  selector: 'app-edit-tariff',
  templateUrl: './edit-tariff.component.html',
  styleUrls: ['./edit-tariff.component.css'],
  providers: [TariffService]
})
export class EditTariffComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  tariffSub: Subscription;
  private form: NgForm;
  title: string;
  isNewTariff = false;
  tariffModel: TariffModel;
  tariffsModel: TariffModel[] = [];

  tariffForm: FormGroup;
  loadingIndicator: boolean;
  quantitys: Quantity[] = [];
  tariffModes: TariffMode[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private config: AppConfiguration,
              private tariffService: TariffService, private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.tariffModel = <TariffModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewTariff = true;
      this.title = 'Create a new tariff';
      return;
    }
    if (id) {
      this.gettariff(id);
    }
  }

  initStaticData(currentLang) {
    let quan: Quantity = new Quantity();
    Quantitys.forEach(pair => {
      quan = {'Id': pair.Id.toString(), 'DescriptionEnglish': pair.DescriptionEnglish, 'Description': pair.Description};
      this.quantitys.push(quan);
    });
    let Tariff: TariffMode = new TariffMode();
    TariffModes.forEach(pair => {
      Tariff = {
        'Id': pair.Id.toString(),
        'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.tariffModes.push(Tariff);
    });
  }

  gettariff(id) {
    this.isNewTariff = false;
    this.loadingIndicator = true;
    this.tariffSub = this.tariffService
      .getTariff(id)
      .subscribe(result => {
          this.tariffModel = result;
          this.updateForm();
        },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    this.tariffForm.setValue({
      cIsActive: this.tariffModel.IsActive,
      cTariffModeId: this.tariffModel.TariffModeId == null ? 1 : this.tariffModel.TariffModeId,
      cName: this.tariffModel.Name == null ? '' : this.tariffModel.Name.toString(),
      cNameEnglish: this.tariffModel.NameEnglish == null ? '' : this.tariffModel.NameEnglish.toString(),
      cAccCode: this.tariffModel.AccCode == null ? '' : this.tariffModel.AccCode.toString(),
      cIncrementalFee: this.tariffModel.IncrementalFee,
      cQuantity: this.tariffModel.Quantity == null ? '' : this.tariffModel.Quantity,
      cFee: this.tariffModel.Fee == null ? '' : this.tariffModel.Fee
    });
    console.log(this.tariffModel);
    // },4000);
    this.isNewTariff = false;
  }

  initForm() {
    this.tariffForm = this.fb.group({
      cName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30),
        Validators.pattern('^([ \u1200-\u137F])+$')])],
      cNameEnglish: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]+$')])],
      cTariffModeId: ['0', Validators.required],
      cIsActive: true,
      cAccCode: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+$')])],
      cIncrementalFee: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+$')])],
      cQuantity: ['', Validators.required],
      cFee: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+$')])]
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.tariffForm.valid) {
      return;
    }

    /*if (this.isNewTariff)
      if (this.checkRecordExistance()) {
        this.toastr.show(
          'Record Exist', 'message', {
            closeButton: true
          })
        return;
      }*/
    this.loadingIndicator = true;
    return this.tariffService.saveTariff(
      this.getEditedTraiff()).subscribe((tariffModel: TariffModel) => {
        this.saveCompleted(tariffModel);
      },
      err => this.handleError(err));
  }

  /*checkRecordExistance(): boolean {
    const formModel = this.tariffForm.value;
    this.servicePrerequisiteSub = this.tariffService
      .getServicePrerequisiteForExistance(formModel.cDescriptionEnglish, formModel.cServiceType)
      .subscribe(result => {
        this.servicePrerequisite = result
      })
    if (this.servicePrerequisite.ServiceId == null) {
      return false;
    } else {
      return true;
    }
  }*/

  private saveCompleted(tariffModel ?: TariffModel) {
    if (tariffModel) {
      this.tariffModel = tariffModel;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
   // this.router.navigate(['tariffs/list']);
    window.history.back();
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedTraiff(): TariffModel {
    const formModel = this.tariffForm.value;
    return {
      TariffId: this.isNewTariff ? null : this.tariffModel.TariffId,
      Name: formModel.cName,
      NameEnglish: formModel.cNameEnglish,
      IsActive: formModel.cIsActive,
      TariffModeId: formModel.cTariffModeId,
      AccCode: formModel.cAccCode,
      IncrementalFee: formModel.cIncrementalFee,
      Quantity: formModel.cQuantity,
      Fee: formModel.cFee,
    };
  }

  ngOnDestroy() {
   // this.tariffSub.unsubscribe();
  }

  /*
    getService() {
      this.tariffService.getService()
        .subscribe(result => {
            this.servicesModel = result;
          },
          error => this.toastr.error(this.errMsg.getError(error)));
    }*/

  onBack() {
    // this.router.navigate(['tariffs/list']);
    window.history.back();
  }

  get AccCode() {
    return this.tariffForm.get('cAccCode');
  }

  get Name() {
    return this.tariffForm.get('cName');
  }

  get NameEnglish() {
    return this.tariffForm.get('cNameEnglish');
  }

  get Fee() {
    return this.tariffForm.get('cFee');
  }

  get Quantity() {
    return this.tariffForm.get('cQuantity');
  }
}
