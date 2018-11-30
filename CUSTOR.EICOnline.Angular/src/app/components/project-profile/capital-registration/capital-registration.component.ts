import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationSettingService} from '../../../Services/application-setting.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {FormService} from '@custor/validation/custom/form';
import {ErrorMessage} from '@custor/services/errMessageService';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {ProjectStatus} from '@custor/const/consts';
import {ProjectStatusModel} from '../../../model/lookupData';
import {CapitalRegistrationService} from '../../../Services/capital-registration.service';
import {CapitalRegistrationModel} from '../../../model/CapitalRegistration.model';

@Component({
  selector: 'app-capital-registration',
  templateUrl: './capital-registration.component.html',
  styleUrls: ['./capital-registration.component.scss']
})
export class CapitalRegistrationComponent implements OnInit, AfterContentChecked {
  capitalRegistrationForm: FormGroup;
  public formErrors = {
    ExchangeRate: '',
    CapitalRegistrationDate: '',
    ActualCostInForeign: '',
    Quarter: '',
    // AdviceReferenceNumber: '',
    Remark: ''
  };
  private ServiceId: string | null;
  private projectId: number;
  public projectStatus: ProjectStatusModel[] = [];
  public loading: boolean;
  public editMode: boolean;
  private ExchangeRate: any;
  public capitalRegistrationList: CapitalRegistrationModel[] = [];
  public dataSource: MatTableDataSource<CapitalRegistrationModel>;
  private editIndex: number;
  private itemEdited: CapitalRegistrationModel;

  displayedColumns = [
    'No', 'AdviceReferenceNumber', 'ActualCostInForeign', 'ExchangeRate', 'CapitalRegistrationDate', 'Remark', 'Action'
  ];
  private projectSta: any;
  public title: string | null;
  public projectName: string | null;
  public investorName: string | null;

  constructor(private fb: FormBuilder,
              public formService: FormService,
              public settingService: ApplicationSettingService,
              public toastr: ToastrService,
              public route: ActivatedRoute,
              public snackbar: MatSnackBar,
              public errMsg: ErrorMessage,
              private projectProfileService: ProjectProfileService,
              private capitalRegistrationService: CapitalRegistrationService,
              private dataSharing: DataSharingService) {
  }


  ngOnInit() {
    this.ServiceId = localStorage.getItem('ServiceId');
    this.formBuild();
    this.getExchangeRate();
    this.initStaticData('en');
    this.route.params
      .subscribe((params: Params) => {
        this.projectId = +params['ProjectId'];
        if (this.projectId > 1) {
          this.getProjectCapitalRegistration();
          this.getProjectStatus(this.projectId);
        }
      });
    this.title = localStorage.getItem('title');
    this.projectName = localStorage.getItem('projectName');
    this.investorName = localStorage.getItem('investorName');

  }

  formBuild() {
    this.capitalRegistrationForm = this.fb.group({
      CapitalRegistrationId: [''],
      ProjectId: [''],
      ActualCostInForeign: ['', Validators.required],
      ExchangeRate: ['', Validators.required],
      CapitalRegistrationDate: ['', Validators.required],
      ProjectStatus: [''],
      AdviceReferenceNumber: ['', Validators.required],
      Remark: ['']
    });
  }

  initStaticData(currentLang) {
    let projectStatus1: ProjectStatusModel = new ProjectStatusModel();
    ProjectStatus.forEach(pair => {
      projectStatus1 = {
        'Id': pair.Id.toString(),
        'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.projectStatus.push(projectStatus1);
    });
  }

  getProjectCapitalRegistration() {
    this.capitalRegistrationService.getCapitalRegistrationByProjectId(this.projectId)
      .subscribe(result => {
        if (result.length > 0) {
          this.capitalRegistrationList = result;
          this.dataSource = new MatTableDataSource<CapitalRegistrationModel>(this.capitalRegistrationList);
          this.loading = false;
        }
      }, error => this.errMsg.getError(error));
  }

  onSubmit() {
    this.formService.markFormGroupTouched(this.capitalRegistrationForm);
    if (this.capitalRegistrationForm.valid) {
      if (!this.editMode) {
        this.capitalRegistrationForm.removeControl('CapitalRegistrationId');
        this.capitalRegistrationService.create(this.capitalRegistrationForm.value)
          .subscribe((result: CapitalRegistrationModel) => {
            this.notification('saved');
            if (this.capitalRegistrationList.length < 1) {
            }
            this.capitalRegistrationList.push(result);
            this.dataSource = new MatTableDataSource<CapitalRegistrationModel>(this.capitalRegistrationList);
            this.onClear();
          }, error => this.toastr.error(this.errMsg.getError(error)));
        this.capitalRegistrationForm.addControl('CapitalRegistrationId', new FormControl(''));

      } else {
        this.capitalRegistrationService.update(this.capitalRegistrationForm.value,
          this.capitalRegistrationList[this.editIndex].CapitalRegistrationId)
          .subscribe(result => {
            this.notification('updated');
            this.capitalRegistrationList[this.editIndex] = result;
            this.dataSource = new MatTableDataSource<CapitalRegistrationModel>(this.capitalRegistrationList);
            this.onClear();
          }, error => this.toastr.error(this.errMsg.getError(error)));
      }
    } else {
      this.formErrors = this.formService.validateForm(this.capitalRegistrationForm, this.formErrors, false);
    }
  }

  onClear() {
    this.editMode = false;
    this.capitalRegistrationForm.reset();
  }

  onEditProduct(index: number) {
    this.editMode = true;
    this.editIndex = index;
    this.itemEdited = this.capitalRegistrationList[index];
    this.capitalRegistrationForm.patchValue(this.itemEdited);

  }

  notification(message: string) {
    this.toastr.success(` Succesfully ${message} Data.!`, 'Success');
    this.loading = false;
    this.snackbar.open(` Succesfully ${message} Data.!`, 'Close', {
      duration: 3000,
    });
  }

  getExchangeRate() {
    this.settingService.getOneById(1)
      .subscribe(result => {
        this.ExchangeRate = result.Value;

      });
  }

  ngAfterContentChecked(): void {
    this.capitalRegistrationForm.patchValue({
      ProjectId: localStorage.getItem('ProjectId')
    });

    this.capitalRegistrationForm.patchValue({
      ExchangeRate: this.ExchangeRate
    });
    this.capitalRegistrationForm.patchValue({
      ProjectStatus: this.projectSta
    });
  }


  private getProjectStatus(projectId: any) {
    this.projectProfileService.getProjectStatus(projectId)
      .subscribe(result => {
        console.log(result);
        this.projectSta = result.toString();
      });
  }

  deleteProduct(index: number, id: number) {
    this.capitalRegistrationService.delete(id)
      .subscribe(() => {
        this.notification('Deleted');
        this.capitalRegistrationList.splice(index, 1);
        this.dataSource = new MatTableDataSource<CapitalRegistrationModel>(this.capitalRegistrationList);
      });
  }


}




