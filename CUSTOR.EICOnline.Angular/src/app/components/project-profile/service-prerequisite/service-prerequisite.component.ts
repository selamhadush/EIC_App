import {AfterContentChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {PreRequisiteDocumentService} from '../../../Services/pre-requisite-document.service';
import {ServicePrerequisiteService} from '../../setting/services-tabs/serviceprerequistie/servicePrerequisite.service';
import {ServicePrerequisite} from '../../../model/service-prerequisite';
import {DocumentModel} from '../../../model/Document.model';
import {Subscription} from 'rxjs';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {UserActivityDataServices} from '../../../admin/user-detail/user-detail.service';
import {ServiceapplicationService} from '../../setting/services-tabs/serviceApplication/serviceapplication.service';
import {ToastrService} from 'ngx-toastr';
import {ErrorMessage} from '@custor/services/errMessageService';
import {InvestorService} from '../../investor/investor.service';
import {Investor} from '../../../model/investor';
import {AngConfirmDialogComponent} from '@custor/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-service-prerequisite',
  templateUrl: './service-prerequisite.component.html',
  styleUrls: ['./service-prerequisite.component.css']
})
export class ServicePrerequisiteComponent implements OnInit, AfterContentChecked {
  documentForm: FormGroup;
  loading = false;
  public progress: number;
  public message: string;
  editMode = false;
  errors: Array<string> = [];

  @Input() projectId: number;
  @Input() sectionId: number;
  // @Input() fileExt = 'JPG, GIF, PNG,Pdf';
  @Input() fileExt = 'Pdf';
  @Input() maxFiles = 5;
  @Input() maxSize = 2; // 5MB
  @Output() uploadStatus = new EventEmitter();

  selectedFile: File = null;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('content') content: ElementRef;

  displayedColumns = ['No', 'PreRequisite', 'url', 'Action'];

  document: FormArray;
  servicePreList: ServicePrerequisite[] = [];
  dataSource: any;
  documentList: DocumentModel[] = [];
  serviceIdSubscription: Subscription;
  serviceId: any;
  legalStatus: any;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(public snackbar: MatSnackBar,
              public dialog: MatDialog,
              private investorService: InvestorService,
              public toast: ToastrService,
              public errMsg: ErrorMessage,
              public userActivityDataServices: UserActivityDataServices,
              public dataSharing: DataSharingService,
              public serviceApplicationsServices: ServiceapplicationService,
              public servicePrerequisiteService: ServicePrerequisiteService,
              public documentServices: PreRequisiteDocumentService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.servicePreList = [];
    this.createForm();
    this.documentForm.patchValue({
      ServiceApplicationId: localStorage.getItem('ServiceApplicationId')
    });
    console.log(this.userActivityDataServices.getAllActivityData().ServiceId);
    this.getServicePrerequisite(this.userActivityDataServices.getAllActivityData().ServiceId);
  }

  createForm() {
    this.documentForm = new FormGroup(
      {
        Name: new FormControl(),
        WorkFlowId: new FormControl(),
        ServicePrerequisiteId: new FormControl(),
        ServiceApplicationId: new FormControl(''),
        KeyWords: new FormControl(null)
      },
      {updateOn: 'submit'}
    );
  }

  notification(message: string) {
    this.toast.success(` Successfully ${message} !`, 'Success');
    this.loading = false;

  }

  prepareSaveUser(): FormData {
    const formModel = this.documentForm.value;

    const formData = new FormData();
    console.log(formModel.workFlowId);
    formData.append('Name', formModel.Name);
    formData.append('ServicePrerequisiteId', formModel.ServicePrerequisiteId);
    formData.append('ServiceApplicationId', formModel.ServiceApplicationId);
    formData.append('KeyWords', formModel.KeyWords);
    formData.append('workFlowId', formModel.WorkFlowId);


    return formData;
  }

  upload(i: number, files: FileList) {
    // this.loading = true;
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    console.log((!this.isValidFiles(files)));
    if (files && files[0].size > 0 && (this.isValidFiles(files))) {
      this.documentForm.patchValue({
        Name: 'Eic_file',
        ServicePrerequisiteId: this.servicePreList[i].ServicePrerequisiteId,
        KeyWords: files[0],
        WorkFlowId: localStorage.getItem('workFlowId')
      });
      this.documentServices
        .uploadDocument(this.prepareSaveUser())
        .subscribe(result => {
          //   this.servicePreList[i].upload = true;
          this.getServicePrerequisite(localStorage.getItem('ServiceId'));
          this.loading = false;
          // setTimeout(() => this.dataSharing.steeperIndex.next(9), 0);
          setTimeout(() => this.dataSharing.currentIndex.next(9), 0);
        }, error => this.toast.error(this.errMsg.getError(error)));
      // this.getServicePrerequisite(localStorage.getItem('ServiceId'));
    } else {
      this.toast.error('Error Occurred Please ', 'Error');
    }
  }

  getServicePrerequisite(id: any) {
    this.servicePrerequisiteService.servicePrerequisiteByServiceId(id)
      .subscribe(result => {
        this.filterPrerequisite(result);

        // console.log(this.servicePreList);
      });
  }

  getDocument(ServiceApplicationId: any) {
    this.documentServices.getAllById(ServiceApplicationId).subscribe(result => {
      this.documentList = result;
      for (let i = 0; i < this.servicePreList.length; i++) {
        for (let j = 0; j < this.documentList.length; j++) {
          if (this.servicePreList[i].ServicePrerequisiteId === this.documentList[j].ServicePrerequisiteId) {
            this.servicePreList[i].upload = true;
            this.servicePreList[i].DocumentId = this.documentList[j].DocumentId;
            this.servicePreList[i].URL = this.documentList[j].KeyWords;
          }
        }
      }
    });
    this.dataSource = new MatTableDataSource<ServicePrerequisite>(this.servicePreList);

  }

  deleteFile(index: number) {
    this.documentServices.delete(index)
      .subscribe(result => {
        this.notification('file Deleted');
        this.getServicePrerequisite(this.userActivityDataServices.getAllActivityData().ServiceId);
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
        this.errors.push('Error, Pdf Extension Only allowed to attach : ' + files[i].name);
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
      this.errors.push('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
      // this.toast.error('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
    }
  }

  UpdateServiceApplication() {
    this.serviceApplicationsServices.finalForApprovalServiceApplications(
      localStorage.getItem('ServiceApplicationId'))
      .subscribe(result => {
        console.log(result);
        this.toast.success('Application submitted successfully we will revise soon as well as  we will notify for any action required');
      });
  }

  ngAfterContentChecked(): void {

    this.documentForm.patchValue({
      WorkFlowId: localStorage.getItem('workFlowId')
    });

    console.log(localStorage.getItem('workFlowId'));
    console.log(this.documentForm.get('WorkFlowId').value);
  }

  next() {
    setTimeout(() => this.dataSharing.steeperIndex.next(9), 0);
    setTimeout(() => this.dataSharing.currentIndex.next(9), 0);
  }

  private filterPrerequisite(prerequeste: ServicePrerequisite[]) {
    this.investorService.getInvestor(localStorage.getItem('InvestorId'))
      .subscribe((result: Investor) => {
        this.getPreReqService(prerequeste, result);
      });


  }

  getPreReqService(pre: any, investor: Investor) {
    this.servicePreList = [];
    for (let i = 0; i < pre.length; i++) {
      if (pre[i].BusinessType === investor.LegalStatus || pre[i].BusinessType === 3) {
        this.servicePreList.push(pre[i]);

      }
    }
    console.log(this.servicePreList);
    this.getDocument(this.documentForm.get('ServiceApplicationId').value);
  }

  confirmFileDelete(index: number) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent, {disableClose: false});
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    return this.confirmDialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.deleteFile(index);
        }
      });
  }
}
