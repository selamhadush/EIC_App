import {AfterContentChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {AppConfiguration} from '../../../config/appconfig';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {LookUpService} from '../../../Services/look-up.service';
import {LookuptypesModel} from '../../../model/lookuptypes';
import {AngConfirmDialogComponent} from '@custor/components/confirm-dialog/confirm-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationSettingService} from '../../../Services/application-setting.service';
import {LookupsModel} from '../../../model/lookups';
import {Subscription} from 'rxjs';
import {CurrencyType} from '../../../model/lookupData';
import {ErrorMessage} from '@custor/services/errMessageService';
import {LookupTypeService} from '../../../Services/lookup-type.service';
import {HttpClient} from '@angular/common/http';
import {IncentiveRequestDetailModel} from '../../../model/IncentiveRequestDetail.Model';
import {IncentiveRequestDetailService} from '../incentive-request/requested-items-list/requested-items-list.service';

@Component({
  selector: 'app-spare-part',
  templateUrl: './spare-part.component.html',
  styleUrls: ['./spare-part.component.scss']
})

export class SparePartComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild('form')

  incentiveRequestItemSub: Subscription;
  lookupSub: Subscription;
  title: string;
  isNewIncentiveRequestItem = false;
  incentiveRequestDetailModel: IncentiveRequestDetailModel;
  incentiveRequestDetailModels: IncentiveRequestDetailModel[] = [];
  sparePartForm: FormGroup;
  editMode = false;
  loading = false;
  projectId: number;
  dataSource: any;
  ShowDetail = false;
  IncentiveItemtEditIndex: number;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;
//'Description',
  displayedColumns = [
    'TotalAmount','Amount', 'Balance', 'Action'
  ];
  displayedColumnsDetail = [
    'No', 'Description', 'Amount','Quantity'
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
  IncentiveCategoryLookup: LookuptypesModel[];
  Lookups: LookupsModel[];
  CustomsLookups: LookupsModel[];
  filterLookups: LookupsModel[];
  private form: NgForm;
  private ExchangeRate: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              public route: ActivatedRoute,
              private http: HttpClient,
              private snackbar: MatSnackBar,
              private lookUpTypeService: LookupTypeService,
              private lookUpsService: LookUpService,
              private config: AppConfiguration,
              public dialog: MatDialog,
              public settingService: ApplicationSettingService,
              private incentiveRequestDetailService: IncentiveRequestDetailService,
              private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    // initialize the form
    // this.initForm();
    // this.initStaticData('en');
  }

  ngOnInit() {
    this.getIncentiveReaquestItmes(localStorage.getItem('ProjectId'));
  }


  getIncentiveReaquestItmes(projectId) {
    this.incentiveRequestDetailService.getIncentiveRequestslistByProjectId(projectId).subscribe(result => {
      if (result.length > 0) {
        this.incentiveRequestDetailModels = result;
        this.dataSource = new MatTableDataSource<IncentiveRequestDetailModel>(this.incentiveRequestDetailModels);
        this.loading = false;
      }
    }, error => this.errMsg.getError(error));
  }

  getIncentiveRequestDetailsByProjectId(projectId) {
    this.incentiveRequestDetailService.getIncentiveRequestsDetailByProjectId(projectId).subscribe(result => {
      if (result.length > 0) {
        this.incentiveRequestDetailModels = result;
        this.dataSource = new MatTableDataSource<IncentiveRequestDetailModel>(this.incentiveRequestDetailModels);
        this.loading = false;
      }
    }, error => this.errMsg.getError(error));
  }

  ngAfterContentChecked(): void {
  }

  onEditIncentiveItem(index: number) {
    this.editMode = true;
    // this.IncentiveItemtEditIndex = index;
    // this.IncentiveRequestDetailModel = this.IncentiveRequestDetailModels[index];
    // this.incentiveRequestHistoryForm.patchValue(this.IncentiveRequestDetailModel);
    this.ShowDetail = true;
    this.getIncentiveRequestDetailsByProjectId(localStorage.getItem('ProjectId'));

  }


  ngOnDestroy() {
    // this.IncentiveRequestItemSub.unsubscribe();
  }

  onBack() {
    // this.router.navigate(['IncentiveRequestItems/list']);
    window.history.back();
  }


}
