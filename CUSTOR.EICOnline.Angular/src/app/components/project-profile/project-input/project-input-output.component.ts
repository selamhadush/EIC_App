import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ProjectRequirementService} from '../../../Services/project-requirement.service';
import {ToastrService} from 'ngx-toastr';
import {ProjectInputService} from '../../../Services/project-input.service';
import {Subscription} from 'rxjs/Subscription';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {ProjectInputModel} from '../../../model/ProjectInput.model';
import {MatSnackBar} from '@angular/material';
import {ProjectRequirementModel} from '../../../model/ProjectRequirement.model';
import {FormService} from '../../../../@custor/validation/custom/form';
import {ErrorMessage} from '../../../../@custor/services/errMessageService';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {ProjectStatusModel, QuarterModel} from '../../../model/lookupData';
import {ProjectStatus, Quarter} from '@custor/const/consts';

@Component({
  selector: 'app-project-input-output',
  templateUrl: './project-input-output.component.html',
  styleUrls: ['./project-input-output.component.css']
})
export class ProjectInputOutputComponent implements OnInit, AfterContentChecked, OnDestroy {
  pIOform: FormGroup;
  rawMaterialInput: FormArray;
  editMode = false;
  editModeInput = false;
  rawInputId: number;
  loading = false;
  subscription: Subscription;
  // projectInputData: ProjectInputModel[] = [];
  projectId: number;
  formErrors = {
    ElectricPower: 'Minimum 0 Maximum 1000 kwh!',
    Water: '',
    OtherUtility: '',
    LandIndustrial: '',
    LandAgricultural: '',
    LandService: '',
    Remark: '',
  };

  dataSource: any;
  // displayedColumns = ['No', 'RawMaterialType', 'Remark', 'Action'];
  public projectInput: ProjectInputModel[] = [];
  inputEditIndex: number;
  public stepperIndex: number;
  public ServiceId: string;
  public projectStatus: ProjectStatusModel[] = [];
  public Quarter: QuarterModel[] = [];

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
          // this.getProjectRawMaterial();
          this.getProjectRequirement();
        }
      });
  }

  getProjectRequirement() {
    this.pRequirementService.RequirementByProject(this.projectId).subscribe(result => {
      if (typeof (result) !== 'undefined') {
        this.editMode = true;
        this.projectId = result.ProjectId;
        this.rawInputId = result.ProjectRequirementId;
        this.pIOform.patchValue(result);
      }

    }, error => this.errMsg.getError(error));
  }


  onSubmit() {
    this.formService.markFormGroupTouched(this.pIOform);

    if (!this.editMode) {
      if (this.pIOform.valid) {
        this.pRequirementService.create(this.getUtility())
          .subscribe(result => {
            this.notification('Saved');
            setTimeout(() => this.dataSharing.steeperIndex.next(3), 0);
            setTimeout(() => this.dataSharing.currentIndex.next(3), 0);


            // this.onClear();
          }, error => this.toastr.error(this.errMsg.getError(error)));
      } else {
        this.formErrors = this.formService.validateForm(this.pIOform, this.formErrors, false);
      }
    } else {
      // this.pIOform.get('RawMaterial').clearValidators();
      this.pRequirementService.update(this.getUtility(), this.rawInputId)
        .subscribe(result => {
          this.notification('update');
          this.dataSharing.currentIndex.next(2);

        }, error => this.toastr.error(this.errMsg.getError(error)));

      this.formErrors = this.formService.validateForm(this.pIOform, this.formErrors, false);
    }
  }

  initForm() {
    this.pIOform = this.formBuilder.group({
      ProjectId: [''],
      ElectricPower: [0, [Validators.min(0)]],
      Water: [0, [Validators.min(0)]],
      OtherUtility: [0, [Validators.min(0)]],
      LandIndustrial: [0, [Validators.min(0)]],
      LandAgricultural: [0, [Validators.min(0)]],
      LandService:[0, [Validators.min(0)]],
      OwnLand: [0, [Validators.min(0)]],
      LeaseLand: [0, [Validators.min(0)]],
      RentalLand: [0, [Validators.min(0)]],
      Quarter: [''],
      RegistrationYear: [''],
      ProjectStatus: [''],
      Remark: ['', [Validators.minLength(2)]],
      workFlowId: ['']
    })
    ;

    this.pIOform.valueChanges.subscribe((data) => {
      this.formErrors = this.formService.validateForm(this.pIOform, this.formErrors, true);
    });
  }

  onClear() {
    this.editMode = false;
    this.pIOform.reset();
  }


  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  notification(message: string) {
    this.toastr.success(` Succesfully ${message} Data.!`, 'Success');

    this.loading = false;
    this.snackbar.open(` Succesfully ${message} Data.!`, 'Close', {
      duration: 3000,
    });
  }

  getUtility(): ProjectRequirementModel {
    return {
      ProjectId: this.pIOform.get('ProjectId').value,
      ElectricPower: this.pIOform.get('ElectricPower').value,
      Water: this.pIOform.get('Water').value,
      OtherUtility: this.pIOform.get('OtherUtility').value,
      LandIndustrial: this.pIOform.get('LandIndustrial').value,
      LandAgricultural: this.pIOform.get('LandAgricultural').value,
      LandService: this.pIOform.get('LandService').value,
      RentalLand: this.pIOform.get('RentalLand').value,
      OwnLand: this.pIOform.get('OwnLand').value,
      LeaseLand: this.pIOform.get('LeaseLand').value,
      Remark: this.pIOform.get('Remark').value,
      workFlowId: this.pIOform.get('workFlowId').value,
    };
  }

  ngAfterContentChecked(): void {
    this.pIOform.patchValue({
      ProjectId: localStorage.getItem('ProjectId')
    });
    // this.pIOform.get('RawMaterial').patchValue({
    //   ProjectId: localStorage.getItem('ProjectId')
    // });
    this.pIOform.patchValue({
      workFlowId: localStorage.getItem('workFlowId')
    });
  }

  next() {
    this.dataSharing.steeperIndex.next(this.stepperIndex);
    this.dataSharing.steeperIndex.next(3);

  }

  initStaticData(currentLang) {

    let projectStatus1: ProjectStatusModel = new ProjectStatusModel();
    ProjectStatus.forEach(pair => {
      projectStatus1 = {'Id': pair.Id.toString(), 'DescriptionEnglish': pair.DescriptionEnglish, 'Description': pair.Description};
      this.projectStatus.push(projectStatus1);
    });

    let Quarter1: QuarterModel = new QuarterModel();
    Quarter.forEach(pair => {
      Quarter1 = {'Id': pair.Id.toString(), 'DescriptionEnglish': pair.DescriptionEnglish, 'Description': pair.Description};
      this.Quarter.push(Quarter1);
    });

  }


  private getProjectStatus(projectId: any) {
    this.projectProfileService.getProjectStatus(projectId)
      .subscribe(result => {
        this.pIOform.patchValue({
          ProjectStatus: result.toString()
        });
      });
  }
}
