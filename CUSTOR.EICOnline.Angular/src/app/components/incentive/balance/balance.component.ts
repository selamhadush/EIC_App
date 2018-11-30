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

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, AfterViewInit {

  dataSource: any;
  loading: boolean;
  searchForm: FormGroup;
  documentForm: FormGroup;
  serviceList: ServiceModel[] = [];
  displayedColumns = [
    'No', 'Description', 'HsCode', 'Quantity', 'MesurmentUnit', 'Balance'
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

  productEdit: IncentiveBoMRequestItemModel;
  public stepperIndex: number;
  public isInvestor = false;
  public unitTypes: UnitType[] = [];
  private currentCategoryId: any;
  private ServiceApplicationId: any;
  private currentLang: string;

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
              private toast: ToastrService,
              private configService: ConfigurationService,
              private formBuilder: FormBuilder,
              private formService: FormService) {
  }

  ngOnInit() {
    this.currentLang = this.configService.language;
    this.getUserType();
    this.initForm();
    this.addForm();
    this.currentCategoryId = this.route.snapshot.params['type'];
    this.ServiceApplicationId = this.route.snapshot.params['ServiceApplicationId'];
    if (this.currentCategoryId === '10778') {
      // this.getBillOfMaterial(this.ServiceApplicationId);
      this.getBillOfMaterial(localStorage.getItem('ProjectId'));
    }
    else if (this.currentCategoryId === '10782') {

    }
    this.initStaticData(this.currentLang);

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
    this.billOfMaterialForm.removeControl('IncentiveBoMRequestItemId');
    this.formService.markFormGroupTouched(this.billOfMaterialForm);
    if (this.billOfMaterialForm.valid) {
      if (!this.editMode) {
        this.billOfMaterilService.create(this.billOfMaterialForm.value)
          .subscribe((result: IncentiveBoMRequestItemModel) => {
            this.billOfMaterialForm.addControl('IncentiveBoMRequestItemId', new FormControl(''));
            this.notification('saved');
            this.getBillOfMaterial(this.ServiceApplicationId);
            this.itemList.push(result);
            // this.dataSource = new MatTableDataSource<IncentiveBoMRequestItemModel>(this.itemList);
            // this.getBillOfMaterial();
          }, error => this.toast.error(this.errMsg.getError(error)));
      } else {
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

  getBillOfMaterial(ProjectId: any) {
    this.loading = true;
    this.billOfMaterilService.getBillOfMaterialByProjectId(ProjectId)
      .subscribe(result => {
        this.itemList = result;
        console.log(result);
        this.dataSource = new MatTableDataSource<IncentiveBoMRequestItemModel>(this.itemList);
        this.loading = false;
        this.dataSource.paginator = this.paginator;


      }, error => this.errMsg.getError(error));
  }

  // getBillOfMaterial(ServiceApplicationId: any) {
  //   this.loading = true;
  //   this.billOfMaterilService.getBillOfMaterialByServiceApplicationId(ServiceApplicationId)
  //     .subscribe(result => {
  //       this.itemList = result.IncentiveBoMRequestItem;
  //       console.log(result);
  //       this.dataSource = new MatTableDataSource<IncentiveBoMRequestItemModel>(result.IncentiveBoMRequestItem);
  //       this.loading = false;
  //       this.dataSource.paginator = this.paginator;
  //
  //
  //     }, error => this.errMsg.getError(error));
  // }

  upload(i: number, files: FileList) {
    // this.loading = true;
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    console.log((!this.isValidFiles(files)));
    if (files && files[0].size > 0 && (this.isValidFiles(files))) {
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
    formData.append('Name', formModel.Name);
    formData.append('ServiceApplicationId', localStorage.getItem('ServiceApplicationId'));
    formData.append('KeyWords', formModel.KeyWords);
    formData.append('ProjectId', localStorage.getItem('ProjectId'));
    formData.append('IncentiveCategoryId', this.currentCategoryId);
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue.replace(/[\W_]/g, '');
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private initForm() {
    this.documentForm = this.formBuilder.group({
      Name: new FormControl(),
      KeyWords: new FormControl(null)
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
      HsCode: new FormControl(),
      Quantity: new FormControl(),
      MesurmentUnit: new FormControl(),
    });
  }
}
