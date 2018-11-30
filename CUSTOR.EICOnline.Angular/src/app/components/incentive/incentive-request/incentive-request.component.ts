import {AfterContentChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppConfiguration} from '../../../config/appconfig';
import {HttpClient} from '@angular/common/http';
import {ErrorMessage} from '@custor/services/errMessageService';
import {determineId} from '@custor/helpers/compare';
import {IncentiveRequestService} from '../../incentive/incentive-request/incentive-request.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/index';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CurrencyType, UnitType} from '../../../model/lookupData';
import {CurrencyTypes} from '@custor/const/consts';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {LookUpService} from '../../../Services/look-up.service';
import {LookupsModel} from '../../../model/lookups';
import {LookupTypeService} from '../../../Services/lookup-type.service';
import {LookuptypesModel} from '../../../model/lookuptypes';
import {IncentiveRequestModel} from '../../../model/IncentiveRequest.model';
import {ApplicationSettingService} from '../../../Services/application-setting.service';
import {AngConfirmDialogComponent} from '@custor/components/confirm-dialog/confirm-dialog.component';
import {AccountService} from '@custor/services/security/account.service';

@Component({
  selector: 'app-incentive-request',
  templateUrl: './incentive-request.component.html',
  styleUrls: ['./incentive-request.component.scss']
})
export class IncentiveRequestComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild('form')

  incentiveRequestItemSub: Subscription;
  lookupSub: Subscription;
  title: string;
  isNewIncentiveRequestItem = false;
  IncentiveRequestModel: IncentiveRequestModel;
  IncentiveRequestModels: IncentiveRequestModel[] = [];
  incentiveRequestItemForm: FormGroup;
  editMode = false;
  loading = false;
  projectId: number;
  dataSource: any;
  IncentiveItemtEditIndex: number;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  displayedColumns = [
    'IncentiveCategory', 'Quantity', 'Amount', 'Action'
  ];
  subscription: Subscription;

  public formErrors = {
    IncentiveCategoryId: '',
    Quantity: '',
    Amount: '',
    CurrencyType: '',
    CustomsSiteId: '',
    RequestDate: '',
    InvoiceNo: '',
  };
  loadingIndicator: boolean;
  currencyTypes: CurrencyType[] = [];
  unitTypes: UnitType[] = [];
  IncentiveCategoryLookup: LookuptypesModel[];
  Lookups: LookupsModel[];
  CustomsLookups: LookupsModel[];
  filterLookups: LookupsModel[];
  hasManyDetial = false;
  showPhase = false;
  PhaseLookups: LookupsModel[];
  private form: NgForm;
  private ExchangeRate: string;
  public isInvestor: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              public route: ActivatedRoute,
              private http: HttpClient,
              private snackbar: MatSnackBar,
              private lookUpTypeService: LookupTypeService,
              private lookUpsService: LookUpService,
              private config: AppConfiguration,
              public dialog: MatDialog,
              public accountService: AccountService,
              public settingService: ApplicationSettingService,
              private IncentiveRequestItemService: IncentiveRequestService, private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.IncentiveRequestModel = <IncentiveRequestModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  get IncentiveCategoryId() {
    return this.incentiveRequestItemForm.get('IncentiveCategoryId');
  }

  // getItemLookup(categoryCode: any) {
  //   this.loadingIndicator = true;
  //   this.lookupSub = this.lookUpsService
  //     .getLookupByParentId(categoryCode)
  //     .subscribe(result => {
  //         this.filterLookups = result;
  //         // this.filterIncentiveCategory(this.IncentiveRequestModel.IncentiveCategoryId);
  //       },
  //       error => this.toastr.error(this.errMsg.getError(error)));
  // }

  ngOnInit() {
    this.initForm();
    this.getIncentiveCategory();
    this.getCustomsLookup();
    this.getExchangeRate();
    this.getLookup();
    this.getUserType();
    const id = this.activatedRoute.snapshot.params['id'];
    this.route.params
      .subscribe((params: Params) => {
        // this.projectId = +params['id'];
        // if (16107 > 1) {
        this.getIncentiveReaquestItmes(localStorage.getItem('ProjectId'), localStorage.getItem('ServiceApplicationId'));
        this.getIncentiveReaquestItmesByServiceAppId(localStorage.getItem('ServiceApplicationId'));
        // }
      });
  }

  getLookup() {
    this.lookupSub = this.lookUpsService
      .getLookupByParentId(10781)
      .subscribe(result => {
          this.PhaseLookups = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getExchangeRate() {
    this.settingService.getOneById(1)
      .subscribe(result => {
        this.ExchangeRate = result.Value;

      });
  }

  onClear() {
    this.editMode = false;
    this.incentiveRequestItemForm.reset();
    this.incentiveRequestItemForm.patchValue({
      ExchangeRate: this.ExchangeRate,
      RequestDate:new Date()
    });
    this.isNewIncentiveRequestItem = true;
  }

  getCustomsLookup() {
    this.loadingIndicator = true;
    this.lookupSub = this.lookUpsService
      .getLookupByParentId(10783)
      .subscribe(result => {
          this.CustomsLookups = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getIncentiveCategory() {
    this.lookUpTypeService.getLookupByParentId().subscribe(result => {
      this.IncentiveCategoryLookup = result;
    });
  }

  getIncentiveReaquestItmesByServiceAppId(ServiceApplicationId) {
    this.IncentiveRequestItemService.getIncentiveRequestByServiceApplicationId(ServiceApplicationId).subscribe(result => {
      if (result.length > 0) {
        this.IncentiveRequestModels = result;
        this.dataSource = new MatTableDataSource<IncentiveRequestModel>(this.IncentiveRequestModels);
        this.loading = false;
      }
    }, error => this.errMsg.getError(error));
  }

  getIncentiveReaquestItmes(projectId, serviceApplicationId) {
    this.IncentiveRequestItemService.getIncentiveRequestslist(projectId, serviceApplicationId).subscribe(result => {
      if (result.length > 1) {
        this.hasManyDetial = true;
      }
    }, error => this.errMsg.getError(error));
  }

  initStaticData(currentLang) {
    let quan: CurrencyType = new CurrencyType();
    CurrencyTypes.forEach(pair => {
      quan = {'Id': pair.Id.toString(), 'DescriptionEnglish': pair.DescriptionEnglish, 'Description': pair.Description};
      this.currencyTypes.push(quan);
    });
    // let unit: UnitType = new UnitType();
    // UnitTypes.forEach(pair => {
    //   unit = {'Id': pair.Id.toString(), 'DescriptionEnglish': pair.DescriptionEnglish, 'Description': pair.Description};
    //   this.unitTypes.push(unit);
    // });
  }

  getIncentiveRequestItem(id) {
    this.isNewIncentiveRequestItem = false;
    this.loadingIndicator = true;
    this.incentiveRequestItemSub = this.IncentiveRequestItemService
      .getIncentiveRequest(id)
      .subscribe(result => {
          this.IncentiveRequestModel = result;
          // this.getItemLookup();
          // this.filterIncentiveCategory(this.IncentiveRequestModel.IncentiveCategoryId);
          this.updateForm();
        },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    this.incentiveRequestItemForm.setValue({
      IncentiveCategory: this.IncentiveRequestModel.IncentiveCategoryId == null ? '' : this.IncentiveRequestModel.IncentiveCategoryId,
      //  IncentiveItem: this.IncentiveRequestModel.IncentiveItemId,
      // UnitId: this.IncentiveRequestModel.UnitId,
      Amount: this.IncentiveRequestModel.Amount,
      CurrencyType: this.IncentiveRequestModel.CurrencyType,
      RequestDate: this.IncentiveRequestModel.RequestDate,
      // MotorNo: this.IncentiveRequestModel.MotorNo,
      InvoiceNo: this.IncentiveRequestModel.InvoiceNo == null ? '' : this.IncentiveRequestModel.InvoiceNo,
      Quantity: this.IncentiveRequestModel.Quantity == null ? 0 : this.IncentiveRequestModel.Quantity,
      CustomsSiteId: this.IncentiveRequestModel.CustomsSiteId == null ? 0 : this.IncentiveRequestModel.CustomsSiteId,
      Phase: this.IncentiveRequestModel.Phase == null ? 0 : this.IncentiveRequestModel.Phase,
      // IsApproved: this.IncentiveRequestModel.IsApproved
    });
    // console.log(this.IncentiveRequestModel);
    // },4000);
    this.isNewIncentiveRequestItem = false;
  }

  initForm() {
    this.incentiveRequestItemForm = this.fb.group({
      IncentiveCategoryId: [this.IncentiveRequestModel.IncentiveCategoryId, Validators.required],
      Quantity: ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      CustomsSiteId: [this.IncentiveRequestModel.CustomsSiteId, Validators.required],
      Amount: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9 ,.]+$')])],
      CurrencyType: [this.IncentiveRequestModel.CurrencyType, Validators.required],
      Phase: [this.IncentiveRequestModel.Phase],
      RequestDate: [new Date(), Validators.required],
      MotorNo: ['', Validators.required],
      InvoiceNo: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      ExchangeRate: [{value: '', disabled: true}],
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    // if (!this.incentiveRequestItemForm.valid) {
    //   return;
    // }
    if (this.hasValidationErrors()) {
      return;
    } else {
      this.loadingIndicator = true;
      return this.IncentiveRequestItemService.saveIncentiveRequest(
        this.getEditedIncentiveItem()).subscribe((incentiveRequestModel: IncentiveRequestModel) => {
          this.saveCompleted(incentiveRequestModel);
        },
        err => this.handleError(err));
    }
  }

  onEditIncentiveItem(index: number) {
    this.editMode = true;
    this.IncentiveItemtEditIndex = index;
    this.IncentiveRequestModel = this.IncentiveRequestModels[index];
    this.incentiveRequestItemForm.patchValue(this.IncentiveRequestModel);
    this.isNewIncentiveRequestItem = true;
  }

  hasValidationErrors() {
    if (this.quantity.value === 0 || this.quantity.value === null) {
      this.toastr.error(' Requested quantity can not be 0');
      return true;
    }
    if (this.CustomsSiteId.value === 0 || this.CustomsSiteId.value === null) {
      this.toastr.error('Please Select Customs Site');
      return true;
    }
    if (this.IncentiveCategoryId.value === 0 || this.IncentiveCategoryId.value === null) {
      this.toastr.error('Please Select Incentive Category');
      return true;
    }
    if (this.RequestDate.value === 0 || this.RequestDate.value === null) {
      this.toastr.error('Please Select Request Date');
      return true;
    }
    if (this.CurrencyType.value === 0 || this.CurrencyType.value === null) {
      this.toastr.error('Please Select Currency Type');
      return true;
    }
    if (this.Amount.value === 0 || this.Amount.value === null) {
      this.toastr.error('Please Enter Amount');
      return true;
    }
    if (this.incentiveRequestItemForm.get('IncentiveCategoryId').toString() === '10778' || this.incentiveRequestItemForm.get('IncentiveCategoryId').toString() === '10782') {
      if (this.Phase.value === 0 || this.Phase.value === null) {
        this.toastr.error('Please Enter Incentive Request Phase Number');
        return true;
      }
    }
  }

  deleteIncentiveItem(index: number, id: number) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.IncentiveRequestItemService.deleteIncentiveRequest(id)
          .subscribe(() => {
            this.notification('Deleted');
            this.IncentiveRequestModels.splice(index, 1);
            this.dataSource = new MatTableDataSource<IncentiveRequestModel>(this.IncentiveRequestModels);
          });
      }
      this.loadingIndicator = false;
    });
  }

  notification(message: string) {
    this.loading = false;
    this.toastr.success(` Succesfully ${message} Data.!`, 'Success');

    this.snackbar.open(` Succesfully ${message} Data.!`, 'Close', {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    // this.IncentiveRequestItemSub.unsubscribe();
  }

  onBack() {
    // this.router.navigate(['IncentiveRequestItems/list']);
    window.history.back();
  }

  ngAfterContentChecked(): void {
    this.incentiveRequestItemForm.patchValue({
      ExchangeRate: this.ExchangeRate
    });
  }

  addDetail(inRequest: IncentiveRequestModel) {
    console.log(inRequest);
    this.router.navigate(['/requested-items-list/' +
    inRequest.IncentiveCategoryId + '/' + inRequest.ProjectId + '/' +
    inRequest.IncentiveRequestId + '/' + inRequest.Quantity + '/' + inRequest.CurrencyType + '/' + inRequest.CurrencyRate + '/' + this.incentiveRequestItemForm.get('Phase')]);

  }

  viewDetail() {
    this.router.navigate(['/incentive-request-history']);
  }

  private saveCompleted(incentiveRequestModel?: IncentiveRequestModel) {
    if (incentiveRequestModel) {
      this.IncentiveRequestModel = incentiveRequestModel;
      // this.getIncentiveReaquestItmes(localStorage.getItem('ProjectId'));
      this.getIncentiveReaquestItmesByServiceAppId(localStorage.getItem('ServiceApplicationId'));
    }
    this.onClear();
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedIncentiveItem(): IncentiveRequestModel {
    const formModel = this.incentiveRequestItemForm.value;
    return {
      IncentiveRequestId: this.isNewIncentiveRequestItem ? 0 : this.IncentiveRequestModel.IncentiveRequestId,
      IncentiveCategoryId: formModel.IncentiveCategoryId,
      Quantity: formModel.Quantity,
      CustomsSiteId: formModel.CustomsSiteId,
      Amount: formModel.Amount,
      CurrencyType: formModel.CurrencyType,
      CurrencyRate: this.ExchangeRate,
      RequestDate: formModel.RequestDate,
      InvoiceNo: formModel.InvoiceNo,
      Phase: formModel.Phase,
      ProjectId: localStorage.getItem('ProjectId'),
      ServiceApplicationId: localStorage.getItem('ServiceApplicationId')
    };
  }
  getUserType() {
    this.isInvestor = this.accountService.getUserType();
  }
  get quantity() {
    return this.incentiveRequestItemForm.get('Quantity');
  }

  get CustomsSiteId() {
    return this.incentiveRequestItemForm.get('CustomsSiteId');
  }

  get amount() {
    return this.incentiveRequestItemForm.get('Amount');
  }

  get currencyType() {
    return this.incentiveRequestItemForm.get('CurrencyType');
  }

  get RequestDate() {
    return this.incentiveRequestItemForm.get('RequestDate');
  }

  get Quantity() {
    return this.incentiveRequestItemForm.get('Quantity');
  }

  get Amount() {
    return this.incentiveRequestItemForm.get('Amount');
  }

  get CurrencyType() {
    return this.incentiveRequestItemForm.get('CurrencyType');
  }

  get InvoiceNo() {
    return this.incentiveRequestItemForm.get('InvoiceNo');
  }

  get Phase() {
    return this.incentiveRequestItemForm.get('Phase');
  }

  filterIncentiveCategory(categoryCode: number) {
    if (!categoryCode) {
      return;
    }
    if (categoryCode === 10778 || categoryCode === 10782) {
      this.showPhase = true;
    } else {
      this.showPhase = false;
    }
  }

}
