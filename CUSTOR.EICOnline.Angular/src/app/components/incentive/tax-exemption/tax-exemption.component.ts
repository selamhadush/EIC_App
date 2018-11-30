import {AfterContentChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppConfiguration} from '../../../config/appconfig';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {ErrorMessage} from '@custor/services/errMessageService';
import {LookupsModel} from '../../../model/lookups';
import {LookUpService} from '../../../Services/look-up.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/index';
import {determineId} from '@custor/helpers/compare';
import {TaxExemptionModel} from '../../../model/incentive/TaxExemption.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaxExemptionService} from '../../incentive/tax-exemption/tax-exemption.service';
import {ToastrService} from 'ngx-toastr';
import {InvactivityService} from '../../setting/category-tabs/InvActivity/invactivity.service';
import {InvActivityModel} from '../../../model/invactivity';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {AngConfirmDialogComponent} from '@custor/components/confirm-dialog/confirm-dialog.component';
import {LookupsService} from '../../setting/lookup-tabs/lookups/lookups.service';

@Component({
  selector: 'app-tax-exemption',
  templateUrl: './tax-exemption.component.html',
  styleUrls: ['./tax-exemption.component.scss']
})
export class TaxExemptionComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild('form')
  taxExemptionSub: Subscription;
  lookupSub: Subscription;
  title: string;
  isNewTaxExemption = false;
  InvActivityModel: InvActivityModel;
  TaxExemptionModel: TaxExemptionModel;
  TaxExemptionModels: TaxExemptionModel[] = [];
  taxexemptionForm: FormGroup;
  editMode = false;
  loading = false;
  dataSource: any;
  TaxexemptiontEditIndex: number;
  ExemptionYear: number;
  displayedColumns = [
    'RevenueBranch', 'RequestDate', 'ExemptionYearRequested', 'Action'
  ];
  subscription: Subscription;

  loadingIndicator: boolean;
  Lookups: LookupsModel[];
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;
  private form: NgForm;
  private ServiceApplicationId: number;
  private setSelectedValue: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              public route: ActivatedRoute,
              private http: HttpClient,
              private snackbar: MatSnackBar,
              private lookUpsService: LookupsService,
              private lookUpService: LookUpService,
              private config: AppConfiguration,
              private taxExemptionService: TaxExemptionService,
              private projectProfileService: ProjectProfileService,
              private invactivityService: InvactivityService,
              private errMsg: ErrorMessage,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.TaxExemptionModel = <TaxExemptionModel>{};
    // initialize the form
    this.initForm();
  }

  get ExemptionYearRequested() {
    return this.taxexemptionForm.get('ExemptionYearRequested');
  }

  get RevenueBranch() {
    return this.taxexemptionForm.get('RevenueBranch');
  }

  get RequestDate() {
    return this.taxexemptionForm.get('RequestDate');
  }

  // private getServiceApplicationRenewal() {
  //   this.projectRenewalService.getRenewalByServiceApplicationId(this.ServiceApplicationId).subscribe(result => {
  //     console.log(result.ProjectRenewal[0]);
  //     this.editMode = true;
  //     this.projectRenewalForm.patchValue(result.ProjectRenewal[0]);
  //     this.projectId = result.ProjectId;
  //     this.InvestorId = result.InvestorId;
  //   }, error => this.errMsg.getError(error));
  // }

  // initStaticData(currentLang) {
  // }

  ngOnInit() {
    this.getTaxExemptionList(localStorage.getItem('ProjectId'));
    this.getTaxExemptionYear(localStorage.getItem('ProjectId'));
    this.initForm();
    this.getItemLookup();
    this.isNewTaxExemption = true;
    this.route.params
      .subscribe((params: Params) => {
        this.ServiceApplicationId = +params['id'];
        // this.projectId = this.route.snapshot.params['id'];
        if (this.ServiceApplicationId > 1) {
          // console.log(this.ServiceApplicationId);
          // this.getServiceApplicationRenewal();
          // this.approval = true;
        }
      });
  }

  setSelectedText(id: any) {
    this.loadingIndicator = true;
    this.lookupSub = this.lookUpsService
      .getLookup(id)
      .subscribe(result => {
          console.log(result);
          this.setSelectedValue = result.Amharic;
        },
        error => this.toastr.error(this.errMsg.getError(error)));


  }

  onClear() {
    this.editMode = false;
    this.taxexemptionForm.reset();
    this.isNewTaxExemption = true;
  }

  getTaxExemptionYear(ProjectId) {
    this.invactivityService.getTaxExemptionYear(ProjectId).subscribe(result => {
      this.InvActivityModel = result;
      this.ExemptionYear = this.InvActivityModel.InAddisOromiaAreas;
      this.taxexemptionForm.patchValue({
        ExemptionYearRequested: this.InvActivityModel.InAddisOromiaAreas
      });
      this.loading = false;

    }, error => this.errMsg.getError(error));
  }

  getTaxExemptionList(ProjectId) {
    this.taxExemptionService.getTaxExemptionList(ProjectId).subscribe(result => {
      if (result.length > 0) {
        this.TaxExemptionModels = result;
        console.log(this.TaxExemptionModels);
        this.dataSource = new MatTableDataSource<TaxExemptionModel>(this.TaxExemptionModels);
        this.loading = false;
      }
    }, error => this.errMsg.getError(error));
  }

  getItemLookup() {
    this.loadingIndicator = true;
    this.lookupSub = this.lookUpService
      .getLookupByParentId(22)
      .subscribe(result => {
          this.Lookups = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  initForm() {
    this.taxexemptionForm = this.fb.group({
      RevenueBranch: ['0', Validators.required],
      ExemptionYearRequested: [{
        value: '',
        disabled: true
      }, Validators.compose([Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9 .]+$')])],
      RequestDate: [new Date(), Validators.required]
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  hasValidationErrors() {
    if (this.RevenueBranch.value === 0 || this.RevenueBranch.value === null) {
      this.toastr.error('Please Select Revenue Branch');
      return true;
    }
    if (this.RequestDate.value === 0 || this.RequestDate.value === null) {
      this.toastr.error('Please Select Request Date');
      return true;
    }
  }

  public onSubmit() {
    if (this.hasValidationErrors()) {
      return;
    }
    else {
      if (this.editMode === false) {
        this.projectProfileService.ProjectsDetail(+localStorage.getItem('ProjectId')).subscribe(result => {
          if (result.BusinessLicenseNo === null) {
            this.existanceNotification('The Project Does not Have Business License');
            return;
          }
        }, error => this.errMsg.getError(error));

        if (this.TaxExemptionModels.length > 0 && this.isNewTaxExemption) {
          this.existanceNotification('Tax Exemption Incentive Already Given');
          return;
        }
      }
      this.loadingIndicator = true;
      return this.taxExemptionService.saveTaxExemption(
        this.getEditedTaxExemption()).subscribe((taxExemptionModel: TaxExemptionModel) => {
          this.saveCompleted(taxExemptionModel);
        },
        err => this.handleError(err));
    }
  }


  onEditTaxExemption(index: number) {
    this.editMode = true;
    this.TaxexemptiontEditIndex = index;
    this.TaxExemptionModel = this.TaxExemptionModels[index];
    this.taxexemptionForm.patchValue(this.TaxExemptionModel);
    this.isNewTaxExemption=false;
  }


  deleteTaxExemption(index: number, id: number) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.TaxexemptiontEditIndex = index;
        this.TaxExemptionModel = this.TaxExemptionModels[index];
        console.log(this.TaxExemptionModel);
        this.taxExemptionService.deleteTaxExemption(this.TaxExemptionModel.IncentiveTaxExemptionRequestID)
          .subscribe(() => {
            this.notification('Deleted');
            this.TaxExemptionModels.splice(index, 1);
            this.dataSource = new MatTableDataSource<TaxExemptionModel>(this.TaxExemptionModels);
          });
      }
      this.loadingIndicator = false;
    });
  }

  ngAfterContentChecked() {
    this.taxexemptionForm.patchValue({
      ServiceId: localStorage.getItem('ServiceId'),
      InvestorId: localStorage.getItem('InvestorId'),
      ProjectId: localStorage.getItem('ProjectId'),
    });
  }

  notification(message: string) {
    this.loading = false;
    this.toastr.success(` Succesfully ${message} Data.!`, 'Success');

    this.snackbar.open(` Succesfully ${message} Data.!`, 'Close', {
      duration: 3000,
    });
  }

  existanceNotification(message: string) {
    this.loading = false;
    this.toastr.info(message, 'Info');

    this.snackbar.open(message, 'Close', {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    // this.TaxExemptionSub.unsubscribe();
  }

  onBack() {
    // this.router.navigate(['TaxExemptions/list']);
    window.history.back();
  }

  private saveCompleted(taxExemptionModel?: TaxExemptionModel) {
    if (taxExemptionModel) {
      this.TaxExemptionModel = taxExemptionModel;
      localStorage.setItem('IncentiveTaxExemptionRequestID', this.TaxExemptionModel.IncentiveTaxExemptionRequestID.toString());
      this.getTaxExemptionList(localStorage.getItem('ProjectId'));
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

  private getEditedTaxExemption(): TaxExemptionModel {
    const formModel = this.taxexemptionForm.value;
    return {
      IncentiveTaxExemptionRequestID: this.isNewTaxExemption ? 0 : this.TaxExemptionModel.IncentiveTaxExemptionRequestID,
      RevenueBranch: formModel.RevenueBranch,
      RevenueBranchDescription: this.setSelectedValue,
      RequestDate: formModel.RequestDate,
      ExemptionYearRequested: this.ExemptionYear,
      ProjectId: +localStorage.getItem('ProjectId')
    };
  }
}

