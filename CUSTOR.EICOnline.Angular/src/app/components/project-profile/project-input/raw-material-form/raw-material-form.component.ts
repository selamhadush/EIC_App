import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormService} from '@custor/validation/custom/form';
import {ProjectProfileService} from '../../../../Services/project-profile.service';
import {ToastrService} from 'ngx-toastr';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {ProjectInputService} from '../../../../Services/project-input.service';
import {ErrorMessage} from '@custor/services/errMessageService';
import {ProjectRequirementService} from '../../../../Services/project-requirement.service';
import {ProjectInputModel} from '../../../../model/ProjectInput.model';
import {DataSharingService} from '../../../../Services/data-sharing.service';
import {ProjectStatusModel, QuarterModel} from '../../../../model/lookupData';
import {ProjectStatus, Quarter} from '@custor/const/consts';

@Component({
  selector: 'app-raw-material-form',
  templateUrl: './raw-material-form.component.html',
  styleUrls: ['./raw-material-form.component.scss']
})
export class RawMaterialFormComponent implements OnInit, AfterContentChecked, OnDestroy {
  //
  pRawMaterialForm: FormGroup;
  editModeInput = false;
  rawInputId: number;
  loading = false;
  subscription: Subscription;
  projectInputData: ProjectInputModel[] = [];
  projectId: number;
  public dataSource: any;
  displayedColumns = ['No', 'RawMaterialType', 'Remark', 'Action'];
  inputEditIndex: number;
  public stepperIndex: number;
  public projectStatus: ProjectStatusModel[] = [];
  public Quarter: QuarterModel[] = [];
  public ServiceId: string;

  constructor(private formBuilder: FormBuilder,
              private errMsg: ErrorMessage,
              public route: ActivatedRoute,
              public projectProfileService: ProjectProfileService,
              private toastr: ToastrService,
              private snackbar: MatSnackBar,
              private formService: FormService,
              private dataSharing: DataSharingService,
              private dataSharingService: DataSharingService,
              private pRequirementService: ProjectRequirementService,
              private pInputService: ProjectInputService) {
  }

  ngOnInit() {
    this.initForm();
    this.ServiceId = localStorage.getItem('ServiceId');

    if (this.ServiceId === '1234') {
      this.getProjectStatus(+localStorage.getItem('ProjectId'));
    }
    this.initStaticData('en');
    this.route.params
      .subscribe((params: Params) => {
        this.projectId = +params['id'];
        if (this.projectId > 1) {
          this.getProjectRawMaterial();

        }
      });
  }


  getProjectRawMaterial() {
    this.pInputService.InputsByProject(this.projectId).subscribe(result => {
      if (typeof (result) !== 'undefined') {
        this.projectInputData = result;
        this.dataSource = new MatTableDataSource<ProjectInputModel>(this.projectInputData);
      }
    }, error => this.errMsg.getError(error));
  }

  onSubmit() {
    this.formService.markFormGroupTouched(this.pRawMaterialForm);


  }

  initForm() {
    this.pRawMaterialForm = this.formBuilder.group({
      ProjectInputId: new FormControl(''),
      ProjectId: new FormControl(this.projectId),
      RawMaterialType: new FormControl('', [Validators.required]),
      IsForeign: new FormControl('', [Validators.required]),
      Remark: new FormControl('', [Validators.minLength(2)]),
      Quarter: [''],
      RegistrationYear: [''],
      ProjectStatus: [''],
    });

    // this.pRawMaterialForm.valueChanges.subscribe((data) => {
    //   this.formErrors = this.formService.validateForm(this.pRawMaterialForm, this.formErrors, true);
    // });
  }

  onSubmitRawMaterial() {
    if (!this.editModeInput) {
      this.pInputService.create(this.getInputData())
        .subscribe((result: ProjectInputModel) => {
          this.notification('Saved');
          // setTimeout(() => this.dataSharing.steeperIndex.next(3), 0);
          setTimeout(() => this.dataSharing.currentIndex.next(4), 0);
          this.projectInputData.push(result);
          this.dataSource = new MatTableDataSource<ProjectInputModel>(this.projectInputData);
          this.pRawMaterialForm.reset();
          if (this.ServiceId === '1234') {
            this.getProjectStatus(+localStorage.getItem('ProjectId'));
          }
        }, error => this.toastr.error(this.errMsg.getError(error)));
    } else {
      this.pInputService.update(this.pRawMaterialForm.value, this.projectInputData[this.inputEditIndex].ProjectInputId)
        .subscribe(result => {
          this.toastr.success('Successfully Updated', 'Sucess');
          this.projectInputData[this.inputEditIndex] = result;
          this.dataSource = new MatTableDataSource<ProjectInputModel>(this.projectInputData);
          this.pRawMaterialForm.reset();

        }, error => this.toastr.error(this.errMsg.getError(error)));
    }
  }


  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }


  notification(message: string) {
    this.toastr.success(` Succesfully ${message} Data.!`, 'Success');
  }


  deleteInput(index: number, id: number) {
    this.pInputService.delete(id)
      .subscribe(() => {
        this.notification('Deleted');
        this.projectInputData.splice(index, 1);
        this.dataSource = new MatTableDataSource<ProjectInputModel>(this.projectInputData);
      });
  }

  onEditInput(index: number) {
    this.editModeInput = true;
    this.inputEditIndex = index;
    console.log(this.projectInputData[index]);
    this.pRawMaterialForm.patchValue(this.projectInputData[index]);
    this.pRawMaterialForm.patchValue({
      IsForeign: this.projectInputData[index].IsForeign.toString()
    });
    console.log(this.projectInputData[index].IsForeign);
  }

  // ngAfterViewChecked(): void {
  //
  // }

  getInputData(): ProjectInputModel {
    return {
      ProjectId: this.pRawMaterialForm.get('ProjectId').value,
      RawMaterialType: this.pRawMaterialForm.get('RawMaterialType').value,
      IsForeign: this.pRawMaterialForm.get('IsForeign').value,
      Remark: this.pRawMaterialForm.get('Remark').value,
      Quarter: this.pRawMaterialForm.get('Quarter').value,
      RegistrationYear: this.pRawMaterialForm.get('RegistrationYear').value,
      ProjectStatus: this.pRawMaterialForm.get('ProjectStatus').value,
    };
  }

  ngAfterContentChecked(): void {
    this.pRawMaterialForm.patchValue({
      ProjectId: localStorage.getItem('ProjectId')
    });

    this.pRawMaterialForm.patchValue({
      workFlowId: localStorage.getItem('workFlowId')
    });
  }

  next() {
    this.dataSharing.steeperIndex.next(this.stepperIndex);
    this.dataSharing.steeperIndex.next(4);

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

    let Quarter1: QuarterModel = new QuarterModel();
    Quarter.forEach(pair => {
      Quarter1 = {
        'Id': pair.Id.toString(),
        'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.Quarter.push(Quarter1);
    });

  }


  private getProjectStatus(projectId: any) {
    this.projectProfileService.getProjectStatus(projectId)
      .subscribe(result => {
        this.pRawMaterialForm.patchValue({
          ProjectStatus: result.toString()
        });
      });
  }
}

