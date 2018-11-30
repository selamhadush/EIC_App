import {Component, OnInit} from '@angular/core';
import {LettertepmlateService} from '../../letter/lettertepmlate.service';
import {LetterTemplateModel} from '../../../model/letter-template.model';
import {AppConfiguration} from '../../../config/appconfig';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ProjectModel} from '../../../model/project.model';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {ErrorMessage} from '@custor/services/errMessageService';
import {LetterService} from './letter.service';
import {determineId} from '@custor/helpers/compare';
import {LookupsModel} from '../../../model/lookups';
import {LookUpService} from '../../../Services/look-up.service';
import {Subscription} from 'rxjs';
import {LetterModel} from '../../../model/letterModel';
import {IncentiveRequestService} from '../../incentive/incentive-request/incentive-request.service';
import {IncentiveRequestModel} from '../../../model/IncentiveRequest.model';
import {TaxExemptionService} from '../../incentive/tax-exemption/tax-exemption.service';
import {TaxExemptionModel} from '../../../model/incentive/TaxExemption.model';
import {AddressModel} from '../../../model/address/Address.model';
import {AddressService} from '../../../Services/Address/address.service';
import {AngConfirmDialogComponent} from '@custor/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  letterTempalteModel: LetterTemplateModel;
  letterModel: LetterModel;
  letterModelList: LetterModel[] = [];
  projectModel: ProjectModel;
  incentiveRequestModel: IncentiveRequestModel;
  incentiveRequestModelList: IncentiveRequestModel[] = [];
  taxExemptionModel: TaxExemptionModel;
  addressList: AddressModel;
  public letterForm: FormGroup;
  content2 = '<p>some content</p>';
  LetterContent: string;
  letterType: number;
  loadingIndicator: boolean;
  isNewLetter = true;
  editMode = false;
  letterEditIndex: number;
  Lookups: LookupsModel[];
  Lookuprevenues: LookupsModel[];
  lookupSub: Subscription;
  dataSource: any;
  loading = false;
  ShowSave = false;

  revenueBranchu = false;
  RequestedDate = false;
  attachment = false;
  inoviceNo = false;
  categoryCode = false;
  chassisNo = false;
  enableButtonGenerate = false;
  InoviceNo: string;
  RequestDate: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  displayedColumns = ['LetterType', 'RequestDate', 'Action'];

  constructor(
    private lettertepmlateService: LettertepmlateService,
    private letterService: LetterService,
    private projectProfileService: ProjectProfileService,
    private incentiveRequestService: IncentiveRequestService,
    private taxExemptionService: TaxExemptionService,
    private addressService: AddressService,
    private config: AppConfiguration,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public route: ActivatedRoute,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private errMsg: ErrorMessage,
    private lookUpsService: LookUpService,
    private fb: FormBuilder
  ) {
    this.letterModel = <LetterModel>{};
    this.initForm();
  }

  get Attachment() {
    return this.letterForm.get('Attachment');
  }

  getCategoryCode() {
    return this.letterForm.get('CategoryCode');
  }

  ngOnInit() {
    this.initForm();
    this.getProjectDetails();
    this.getIncentiveDetails();
    this.getLetterTempalte();
    if (localStorage.getItem('ServiceId') === '1045') {
      this.getItemLookup(2846, 100);
    }
    else if (localStorage.getItem('ServiceId') === '1046' || localStorage.getItem('ServiceId') === '1047' || localStorage.getItem('ServiceId') === '1054') {
      this.getItemLookup(2845, 2847);
    } else if (localStorage.getItem('ServiceId') === '13') {
      this.getItemLookup(2851, 2854);
    }
    this.getReveuneLookup();
    this.getLetters();
    this.getAddressData(localStorage.getItem('ProjectId'));
    if (localStorage.getItem('ServiceId') === '1045') {
      this.getTaxExemptionDetails();
    }
    // else if (localStorage.getItem('ServiceId') === '1046') {
    //
    // }else if (localStorage.getItem('ServiceId') === '1047') {
    //
    // }
  }

  getTaxExemptionDetails() {
    this.taxExemptionService.getTaxExemption(localStorage.getItem('IncentiveTaxExemptionRequestID'))
      .subscribe(result => {
          if (result) {
            console.log(result);
            this.taxExemptionModel = result;
          }
        },
        error => this.errMsg.getError(error));
  }

  getReveuneLookup() {
    this.loadingIndicator = true;
    this.lookupSub = this.lookUpsService
      .getLookupByParentId(22)
      .subscribe(result => {
          this.Lookuprevenues = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getItemLookup(code: any, code1: any) {
    this.loadingIndicator = true;
    this.lookupSub = this.lookUpsService
      .getLookupByParentIdandCode(707, code, code1)
      .subscribe(result => {
          this.Lookups = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getLetters() {
    this.letterService.getLetterList(localStorage.getItem('ProjectId'))
      .subscribe(result => {
          if (result) {
            this.letterModelList = result;
            console.log(this.letterModelList);
            this.dataSource = new MatTableDataSource<LetterModel>(this.letterModelList);
          }
        },
        error => this.errMsg.getError(error));
  }

  getIncentiveDetails() {
    this.incentiveRequestService.getIncentiveRequestByServiceApplicationId(localStorage.getItem('ServiceApplicationId'))//34517
      .subscribe(result => {
          if (result) {
            console.log(this.incentiveRequestModelList);
            this.incentiveRequestModelList = result;
            console.log(result);
          }
        },
        error => this.errMsg.getError(error));
  }

  getAddressData(parent: any) {
    this.addressService.getAddress(parent)
      .subscribe((result: AddressModel) => {
        this.addressList = result;
        console.log(result);
      }, error => this.errMsg.getError(error));
  }

  getProjectDetails() {
    this.projectProfileService.projectsDetailForLetter(localStorage.getItem('ProjectId'))
      .subscribe(result => {
          if (result) {
            this.projectModel = result;
          }
        },
        error => this.errMsg.getError(error));
  }

  SetControls(letterType: number) {
    if (!letterType) {
      return;
    }
    if (letterType === 2845) {
      this.inoviceNo = false;
      this.attachment = true;
      this.revenueBranchu = false;
      this.categoryCode = false;
      this.chassisNo = false;

    } else if (letterType === 2846) {
      this.inoviceNo = false;
      this.attachment = true;
      this.revenueBranchu = false;
      this.categoryCode = false;
      this.chassisNo = false;
    } else if (letterType === 2847) {
      this.inoviceNo = false;
      this.attachment = true;
      this.revenueBranchu = false;
      this.categoryCode = false;
      this.chassisNo = false;
    }
    console.log(localStorage.getItem('ServiceId'));
    this.enableButtonGenerate = true;
    this.getLetterTempalte();
  }

  getLetterTempalte() {
    const formModel = this.letterForm.value;
    this.lettertepmlateService.getletterTemplate(formModel.LetterType).subscribe(result => {
        if (result) {
          this.letterTempalteModel = result;
        }
      },
      error => this.errMsg.getError(error));
  }

  initForm() {
    this.letterForm = this.fb.group({
      LetterContent: ['', Validators.required],
      LetterType: ['0', Validators.required],
      RevenueBranch: ['0', Validators.required],
      InvoiceNo: ['', Validators.required],
      Attachment: ['', Validators.compose([Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9 .]+$')])],
      CategoryCode: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9 .]+$')])],
      RequestDate: new FormControl(),


    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    this.loadingIndicator = true;
    return this.letterService.saveletter(
      this.getEditedLetter()).subscribe((letterModel: LetterModel) => {
        this.saveCompleted(letterModel);
      },
      err => this.handleError(err));
  }

  onEditLetter(index: number) {
    this.ShowSave = true;
    this.editMode = true;
    this.letterEditIndex = index;
    this.letterModel = this.letterModelList[index];
    this.letterForm.patchValue(
      this.letterModel
    );
    this.isNewLetter = false;
  }

  onClear() {
    this.editMode = false;
    this.letterForm.reset();
    this.isNewLetter = true;
  }

  generatePDF() {
    this.ShowSave = true;
    console.log(this.projectModel);
    this.LetterContent = this.letterTempalteModel.LetterContent.replace(/{{FullName}}/g,
      this.projectModel.Investor.FirstNameEng.toUpperCase() +
      ' ' + this.projectModel.Investor.FatherNameEng.toUpperCase() +
      ' ' + this.projectModel.Investor.GrandNameEng.toUpperCase());
    this.LetterContent = this.LetterContent.replace(/{{StartDate}}/g,
      new Date(this.projectModel.StartDate).getMonth() +
      '/' + new Date(this.projectModel.StartDate).getDay() + '/' + new Date(this.projectModel.StartDate).getFullYear());
    this.LetterContent = this.LetterContent.replace(/{{InvActivity}}/g,
      this.projectModel.InvestmentActivity.DescriptionEnglish.toUpperCase());
    this.LetterContent = this.LetterContent.replace(/{{InvestmentPermitNo}}/g,
      this.projectModel.InvestmentPermitNo);
    this.LetterContent = this.LetterContent.replace(/{{ExemptionYear}}/g,
      this.projectModel.InvestmentActivity.InAddisOromiaAreas.toString());
    const formModel = this.letterForm.value;
    this.LetterContent = this.LetterContent.replace(/{{Num}}/g,
      formModel.Attachment);
    this.LetterContent = this.LetterContent.replace(/{{CategoryCode}}/g,
      this.projectModel.InvestmentActivity.Code);
    this.LetterContent = this.LetterContent.replace(/{{ChassisNo}}/g,
      formModel.ChassisNo);
    this.LetterContent = this.LetterContent.replace(/{{Capital}}/g,
      (this.projectModel.ProjectCost.OtherCapitalCost + this.projectModel.ProjectCost.EquityFinance + this.projectModel.ProjectCost.LoanFinance).toString());

    if (localStorage.getItem('ServiceId') === '1045') {
      this.LetterContent = this.LetterContent.replace(/{{OrgName}}/g,
        this.taxExemptionModel.RevenueBranchDescription
      );
    } else if (localStorage.getItem('ServiceId') === '1046') {
      // this.InoviceNo = this.incentiveRequestModelList[0].InvoiceNo;
    } else {
      // this.InoviceNo = this.incentiveRequestModelList[0].InvoiceNo;
    }
    this.LetterContent = this.LetterContent.replace(/{{ReqDate}}/g,
      new Date().toDateString());
    // this.RequestDate);
    this.LetterContent = this.LetterContent.replace(/{{InvoiceNo}}/g,
      //this.InoviceNo = this.incentiveRequestModelList[0].InvoiceNo
      "n343en7"
    );
    this.LetterContent = this.LetterContent.replace(/{{Region}}/g,
      this.addressList.Region.Description);


    this.letterTempalteModel.LetterContent = this.LetterContent;
    this.letterForm.patchValue({
      LetterContent: this.LetterContent
    });

  }

  deleteLetter(index: number, id: number) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.letterService.deleteletter(id)
          .subscribe(() => {
            this.notification('Deleted');
            this.letterModelList.splice(index, 1);
            this.dataSource = new MatTableDataSource<LetterModel>(this.letterModelList);
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

  toConvertString(value: any) {
    if (value !== null) {
      return value.toString();
    } else {
      return value;
    }
  }

  private saveCompleted(letter?: LetterModel) {
    if (letter) {
      this.letterModel = letter;
      // console.log(this.letterModelList);
      // this.dataSource = new MatTableDataSource<LetterModel>(this.letterModelList);
      this.getLetters();
    }
    this.onClear();
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
  }

  private getEditedLetter(): LetterModel {
    const formModel = this.letterForm.value;
    return {
      LetterId: this.isNewLetter ? 0 : this.letterModel.LetterId,
      LetterType: formModel.LetterType,
      LetterContent: formModel.LetterContent,
      // Attachment: formModel.Attachment,
      RequestDate: new Date(),
      ProjectId: localStorage.getItem('ProjectId')
    };
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  // get LetterNo() {
  //   return this.letterForm.get('LetterNo');
  // }
}
