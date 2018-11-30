import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FormService} from '@custor/validation/custom/form';
import {ServiceModel} from '../../../model/Service.model';
import {AccountService} from '@custor/services/security/account.service';
import {ServiceService} from '../../../Services/service.service';
import {ErrorMessage} from '@custor/services/errMessageService';
import {ServiceapplicationService} from '../../setting/services-tabs/serviceApplication/serviceapplication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BillOfMaterialService} from '../../../Services/incentive/bill-of-material.service';
import {IncentiveBoMRequestItemModel} from '../../../model/incentive/IncentiveBoMRequestItem.model';
import {UnitType} from '../../../model/lookupData';
import {UnitTypes} from '@custor/const/consts';
import {ConfigurationService} from '@custor/services/configuration.service';
import {LookupsModel} from '../../../model/lookups';
import {Subscription} from 'rxjs';
import {LookUpService} from '../../../Services/look-up.service';
import {determineId} from '@custor/helpers/compare';

@Component({
  selector: 'app-bill-of-material',
  templateUrl: './bill-of-material.component.html',
  styleUrls: ['./bill-of-material.component.scss']
})
export class BillOfMaterialComponent implements OnInit, AfterViewInit {

  dataSource: any;
  loading: boolean;
  searchForm: FormGroup;
  documentForm: FormGroup;
  serviceList: ServiceModel[] = [];
  Lookups: LookupsModel[];
  displayedColumns = [
    'No', 'Description', 'HsCode', 'Quantity', 'MesurmentUnit', 'RejectionReason', 'approval', 'Action'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  errors: Array<string> = [];

  @Input() projectId: number;
  @Input() sectionId: number;
  // @Input() fileExt = 'JPG, GIF, PNG,Pdf';
  @Input() fileExt = 'xlsx,xls';
  @Input() maxFiles = 5;
  @Input() maxSize = 2; // 5MB
  @Output() uploadStatus = new EventEmitter();

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('content') content: ElementRef;
  isOfficer = false;
  formErrors: {};
  public assigned: boolean;
  public itemList: IncentiveBoMRequestItemModel[] = [];
  billOfMaterialForm: FormGroup;

  editMode = false;

  addshow = false;
  productEditIndex: number;
  lookupSub: Subscription;

  productEdit: IncentiveBoMRequestItemModel;
  public stepperIndex: number;
  public isInvestor = false;
  public unitTypes: UnitType[] = [];
  PhaseLookups: LookupsModel[];
  phaseId: number;
  private currentCategoryId: any;
  private ServiceApplicationId: any;
  private currentLang: string;
  private IncentiveCategoryId: number;

  constructor(private billOfMaterilService: BillOfMaterialService,
              private errMsg: ErrorMessage,
              private serviceApplicationsServices: ServiceapplicationService,
              private router: Router,
              public dialog: MatDialog,
              private serviceApplication: ServiceapplicationService,
              private dataSharing: DataSharingService,
              private route: ActivatedRoute,
              private accountService: AccountService,
              private service: ServiceService,
              private lookUpsService: LookUpService,
              private toast: ToastrService,
              private configService: ConfigurationService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private formService: FormService) {
  }

  get Phase() {
    return this.documentForm.get('Phase');
  }

  getPhaseId(value: number) {
    this.phaseId = value;
  }

  ngOnInit() {
    this.currentLang = this.configService.language;
    this.getUserType();
    this.initForm();
    this.addForm();
    this.getItemLookup();
    this.getLookup();
    this.currentCategoryId = this.route.snapshot.params['type'];
    if (this.currentCategoryId == 1) {
      this.IncentiveCategoryId = 10778;
    }
    if (this.currentCategoryId == 2) {
      this.IncentiveCategoryId = 10779;
    }
    this.ServiceApplicationId = this.route.snapshot.params['ServiceApplicationId'];
    this.getBillOfMaterial(this.ServiceApplicationId);
    // this.getBillOfMaterial(localStorage.getItem('ProjectId'));
    this.initStaticData(this.currentLang);

  }

  getItemLookup() {
    this.lookupSub = this.lookUpsService
      .getLookupByParentId(10780)
      .subscribe(result => {
          this.Lookups = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  onMangerControlChanged($event, data?: IncentiveBoMRequestItemModel) {
    console.log(data);
    const id = $event.source.value;

    this.billOfMaterilService.finalForApprovalBillOfMaterial(data.IncentiveBoMRequestItemId)
      .subscribe(result => {
        console.log(result);
      });
    if ($event.checked) {
      this.toast.success('Item approved  successfully');

    } else if (!$event.checked) {
      this.toast.success('Item approved cancelled successfully');
    }

  }

  onSubmit() {
    this.formService.markFormGroupTouched(this.billOfMaterialForm);
    if (this.billOfMaterialForm.valid) {
      if (!this.editMode) {
        this.billOfMaterialForm.removeControl('IncentiveBoMRequestItemId');
        this.billOfMaterilService.create(this.billOfMaterialForm.value)
          .subscribe((result: IncentiveBoMRequestItemModel) => {
            this.notification('saved');
            this.getBillOfMaterial(this.ServiceApplicationId);
            this.itemList.push(result);
            // this.dataSource = new MatTableDataSource<IncentiveBoMRequestItemModel>(this.itemList);
            // this.getBillOfMaterial();
          }, error => this.toast.error(this.errMsg.getError(error)));
        this.billOfMaterialForm.addControl('IncentiveBoMRequestItemId', new FormControl(''));
        this.onClear();
      } else {
        console.log(this.billOfMaterialForm.value);
        this.billOfMaterilService.update(this.billOfMaterialForm.value, this.itemList[this.productEditIndex].IncentiveBoMRequestItemId)
          .subscribe(result => {
            this.notification('updated');
            this.itemList[this.productEditIndex] = result;
            this.dataSource = new MatTableDataSource<IncentiveBoMRequestItemModel>(this.itemList);
            this.onClear();
          }, error => this.toast.error(this.errMsg.getError(error)));
      }
    } else {
      this.formErrors = this.formService.validateForm(this.billOfMaterialForm, this.formErrors, false);
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue.replace(/[\W_]/g, '');
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClear() {
    this.billOfMaterialForm.reset();

  }

  onEdit(index: number) {
    this.editMode = true;
    console.log(index);

    this.productEditIndex = index;
    this.productEdit = this.itemList[index];
    this.billOfMaterialForm.patchValue(this.productEdit);

  }

  addItem() {
    this.addshow = true;
  }

  delete(index: number, id: number) {
    this.billOfMaterilService.delete(id)
      .subscribe(() => {
        this.notification('Deleted');
        this.itemList.splice(index, 1);
        this.dataSource = new MatTableDataSource<IncentiveBoMRequestItemModel>(this.itemList);
      });
  }

  getBillOfMaterial(ServiceApplicationId: any) {
    this.loading = true;
    this.billOfMaterilService.getBillOfMaterialByServiceApplicationId(ServiceApplicationId)
      .subscribe(result => {
        this.itemList = result.IncentiveBoMRequestItem;
        console.log(result);
        this.dataSource = new MatTableDataSource<IncentiveBoMRequestItemModel>(result.IncentiveBoMRequestItem);
        this.loading = false;
        this.dataSource.paginator = this.paginator;


      }, error => this.errMsg.getError(error));
  }

  upload(i: number, files: FileList) {
    console.log(this.phaseId);
    if (this.phaseId === 0 || this.phaseId === null) {
      this.toastr.error('Please Select Construction Materials Incentive Phase');
      return true;
    }
    // this.loading = true;
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    console.log((!this.isValidFiles(files)));
    if (files && files[0].size > 0 && (this.isValidFiles(files))) {
      const formModel = this.documentForm.value;
      this.documentForm.patchValue({
        Name: files[0].name,
        KeyWords: files[0],
      });

      this.billOfMaterilService
        .uploadDocument(this.prepareSaveUser())
        .subscribe(result => {
          this.itemList = result;
          this.dataSource = new MatTableDataSource<IncentiveBoMRequestItemModel>(result);
          this.loading = false;
          // this.dataSource.paginator = this.paginator;

          this.itemList = result;
          this.loading = false;
        }, error => this.toast.error(this.errMsg.getError(error)));
      // this.getServicePrerequisite(localStorage.getItem('ServiceId'));
    } else {
      this.toast.error('Error Occurred Please ', 'Error');
    }
  }

  prepareSaveUser(): FormData {
    const formModel = this.documentForm.value;
    const formData = new FormData();
    console.log(formModel.workFlowId);
    // console.log(this.documentForm.value);
    formData.append('Name', formModel.Name);
    formData.append('ServiceApplicationId', localStorage.getItem('ServiceApplicationId'));
    formData.append('KeyWords', formModel.KeyWords);
    formData.append('ProjectId', localStorage.getItem('ProjectId'));
    formData.append('IncentiveCategoryId', this.IncentiveCategoryId.toString());
    //formData.append('Phase',this.phaseId );//formModel.Phase
    // console.log(formModel.Phase);
    return formData;
  }

  // uploadData(ServiceApplicationId: any) {
  //   this.loading = true;
  //   this.billOfMaterilService.getBillOfMaterialByServiceApplicationId(ServiceApplicationId).subscribe(result => {
  //     this.itemList = result;
  //     this.dataSource = new MatTableDataSource<IncentiveBoMRequestItemModel>(result);
  //     this.loading = false;
  //
  //
  //   });
  // }

  // }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  clear() {
    this.billOfMaterialForm.reset();
  }

  UpdateServiceApplication() {
    this.serviceApplicationsServices.finalForApprovalServiceApplications(
      localStorage.getItem('ServiceApplicationId'))
      .subscribe(result => {
        console.log(result);
        this.toast.success('Application submitted successfully we will revise soon as well as  we will notify for any action required');
      });
  }

  notification(message: string) {
    this.loading = false;
    this.toast.success(` Succesfully ${message} Data.!`, 'Success');

  }


  // ngAfterContentChecked(): void {
  //
  //

  getUserType() {
    this.isInvestor = this.accountService.getUserType();
  }

  initStaticData(currentLang) {

    let unit: UnitType = new UnitType();
    UnitTypes.forEach(pair => {
      unit = {
        'Id': pair.Id.toString(),
        'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.unitTypes.push(unit);
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

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  private initForm() {
    this.documentForm = this.formBuilder.group({
      Name: new FormControl(),
      KeyWords: new FormControl(null),
      //Phase: new FormControl()
    });
  }

  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.maxFiles) {
      this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
      // this.toast.error('Error: At a time you can upload only ' + this.maxFiles + ' files', 'Error');
      return;
    }
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }

  private isValidFileExtension(files) {
    // Make array of file extensions
    const extensions = (this.fileExt.split(','))
      .map(function (x) {
        return x.toLocaleUpperCase().trim();
      });

    for (let i = 0; i < files.length; i++) {
      // Get file extension
      const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      const exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push('Error ,Pdf Extension Only allowed to attach : ' + files[i].name);
        // this.toast.error('Error ,Pdf Extension Only allowed to attach :' + files[i].name, 'Error');

      }
      // Check file size
      this.isValidFileSize(files[i]);
    }
  }

  private isValidFileSize(file) {
    const fileSizeinMB = file.size / (1024 * 100);
    const size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
    if (size > this.maxSize) {
      this.errors.push('Error (File Size): ' +
        file.name + ': exceed file size limit of ' +
        this.maxSize + 'MB ( ' + size + 'MB )');
      // this.toast.error('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
    }
  }

  private addForm() {
    this.billOfMaterialForm = this.formBuilder.group({
      IncentiveBoMRequestItemId: new FormControl(),
      IncentiveRequestId: 1,
      ProjectId: localStorage.getItem('ProjectId'),
      ServiceApplicationId: localStorage.getItem('ServiceApplicationId'),
      Description: new FormControl(),
      RejectionReason: new FormControl(),
      HsCode: new FormControl(),
      Quantity: new FormControl(),
      MesurmentUnit: new FormControl(),
      IsApproved: new FormControl(),
    });
  }
}
