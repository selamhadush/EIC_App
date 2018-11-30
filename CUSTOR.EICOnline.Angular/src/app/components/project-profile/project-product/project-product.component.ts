import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ToastrService} from 'ngx-toastr';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {ProjectInputService} from '../../../Services/project-input.service';
import {ProjectRequirementService} from '../../../Services/project-requirement.service';
import {ProjectOutputService} from '../../../Services/project-output.service';
import {ErrorStateMatcher, MatSnackBar, MatTableDataSource} from '@angular/material';
import {ProjectOutputModel} from '../../../model/ProjectOutput.model';
import {Subject} from 'rxjs/Rx';
import {ErrorMessage} from '@custor/services/errMessageService';
import {FormService} from '@custor/validation/custom/form';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {ProjectStatusModel, QuarterModel, UnitType} from '../../../model/lookupData';
import {ProjectStatus, Quarter, UnitTypes} from '@custor/const/consts';

@Component({
  selector: 'app-project-product',
  templateUrl: './project-product.component.html',
  styleUrls: ['./project-product.component.css']
})
export class ProjectProductComponent implements OnInit, OnDestroy, AfterViewChecked {
  productForm: FormGroup;
  editMode = false;
  loading = false;
  projectId: number;
  dataSource: any;
  productEditIndex: number;
  displayedColumns = [
    'No', 'ProductName', 'ProductQty', 'ProductValue', 'DomesticMarketShare', 'ExportMarketShare', 'Remark',
    'Action'
  ];
  ProjectOutputChanged = new Subject<ProjectOutputModel[]>();
  subscription: Subscription;
  formErrors = {
    ProductName: '',
    ProductQty: '',
    ProductUnit: '',
    ProductValue: '',
    DomesticMarketShare: '',
    ExportMarketShare: '',
    Remark: '',
    Quarter: '',
    RegistrationYear: ''
  };
  productData: ProjectOutputModel[] = [];
  productEdit: ProjectOutputModel;
  public stepperIndex: number;


  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  public errors = errorMessages;
  public ServiceId: string | null;
  public projectStatus: ProjectStatusModel[] = [];
  public Quarter: QuarterModel[] = [];
  public unitTypes: UnitType[] = [];

  constructor(private formBuilder: FormBuilder,
              private errMsg: ErrorMessage,
              public route: ActivatedRoute,
              public projectProfileService: ProjectProfileService,
              private toastr: ToastrService,
              private snackbar: MatSnackBar,
              private dataSharing: DataSharingService,
              private formService: FormService,
              private dataSharingService: DataSharingService,
              private pRequirementService: ProjectRequirementService,
              private pInputService: ProjectInputService,
              private pOutputService: ProjectOutputService) {
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
          this.getProjectOutPut();
        }
      });
    this.autoSum();
  }

  getProjectOutPut() {
    this.pOutputService.getPOutPutByProject(this.projectId).subscribe(result => {
      if (result.length > 0) {
        this.productData = result;
        this.dataSource = new MatTableDataSource<ProjectOutputModel>(this.productData);
        this.loading = false;
      }
    }, error => this.errMsg.getError(error));
  }

  onSubmit() {
    this.productForm.removeControl('ProjectOutputId');
    this.formService.markFormGroupTouched(this.productForm);
    if (this.productForm.valid) {
      if (!this.editMode) {
        this.pOutputService.create(this.getProjectOutputData())
          .subscribe((result: ProjectOutputModel) => {
            this.productForm.addControl('ProjectOutputId', new FormControl(''));
            this.notification('saved');
            if (this.productData.length < 1) {
              // setTimeout(() => this.dataSharing.steeperIndex.next(7), 0);
              setTimeout(() => this.dataSharing.currentIndex.next(8), 0);
            }
            this.productData.push(result);
            this.dataSource = new MatTableDataSource<ProjectOutputModel>(this.productData);
            this.onClear();
          }, error => this.toastr.error(this.errMsg.getError(error)));
      } else {
        this.pOutputService.update(this.getProjectOutputData(), this.productData[this.productEditIndex].ProjectOutputId)
          .subscribe(result => {
            this.notification('updated');
            this.productData[this.productEditIndex] = result;
            this.dataSource = new MatTableDataSource<ProjectOutputModel>(this.productData);
            this.onClear();
          }, error => this.toastr.error(this.errMsg.getError(error)));
      }
    } else {
      this.formErrors = this.formService.validateForm(this.productForm, this.formErrors, false);
    }
  }

  onClear() {
    this.editMode = false;
    this.productForm.reset();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      ProjectId: new FormControl(''),
      ProjectOutputId: new FormControl(''),
      workFlowId: new FormControl(''),
      ProductName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      ProductQty: new FormControl(0, [Validators.required, Validators.min(0)]),
      ProductUnit: new FormControl('', [Validators.required]),
      ProductValue: new FormControl(0, [Validators.required, Validators.min(0)]),
      Quarter: [''],
      RegistrationYear: [''],
      ProjectStatus: [''],
      sharePercent: this.formBuilder.group({
        DomesticMarketShare: [0, [
          Validators.required, Validators.min(0)
        ]],
        ExportMarketShare: [0, Validators.required]
      }, {validator: this.childrenEqual}),
      Remark: new FormControl('', [Validators.minLength(2)])
    });
  }

  private getProjectOutputData(): ProjectOutputModel {
    const formModel = this.productForm.value;

    return {
      ProjectId: formModel.ProjectId,
      // ProjectOutputId: '',
      workFlowId: formModel.workFlowId,
      ProductName: formModel.ProductName,
      ProductQty: formModel.ProductQty,
      ProductUnit: formModel.ProductUnit,
      ProductValue: formModel.ProductValue,
      DomesticMarketShare: formModel.sharePercent.DomesticMarketShare,
      ExportMarketShare: formModel.sharePercent.ExportMarketShare,
      Quarter: formModel.Quarter,
      RegistrationYear: formModel.RegistrationYear,
      ProjectStatus: formModel.ProjectStatus,
      // IsExisting: formModel.IsExisting,
      Remark: formModel.Remark
    };
  }

  childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value + formGroup.get(firstControlName).value === 100);
    return isValid ? null : {childrenNotEqual: true};
  };


  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  notification(message: string) {
    this.loading = false;
    this.toastr.success(` Succesfully ${message} Data.!`, 'Success');

    this.snackbar.open(` Succesfully ${message} Data.!`, 'Close', {
      duration: 3000,
    });
  }

  deleteProduct(index: number, id: number) {
    this.pOutputService.delete(id)
      .subscribe(() => {
        this.notification('Deleted');
        this.productData.splice(index, 1);
        this.dataSource = new MatTableDataSource<ProjectOutputModel>(this.productData);
      });
  }

  onEditProduct(index: number) {
    this.editMode = true;
    this.productEditIndex = index;
    this.productEdit = this.productData[index];
    this.productForm.patchValue(this.productEdit);
    this.productForm.get('sharePercent').patchValue(
      {
        DomesticMarketShare: this.productEdit.DomesticMarketShare,
        ExportMarketShare: this.productEdit.ExportMarketShare
      }
    );
  }

  ngAfterViewChecked(): void {
    this.productForm.patchValue({
      ProjectId: localStorage.getItem('ProjectId')
    });
    this.productForm.patchValue({
      workFlowId: localStorage.getItem('workFlowId')
    });
  }

  next() {
    this.dataSharing.steeperIndex.next(7);

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
        this.productForm.patchValue({
          ProjectStatus: result.toString()
        });
      });
  }

  private autoSum() {
    this.productForm.get('sharePercent').get('DomesticMarketShare')
      .valueChanges.subscribe(result => {
      this.productForm.get('sharePercent').patchValue({
        ExportMarketShare: 100 - result
      });
    });


  }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}

/**
 * Collection of reusable RegExps
 */
export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};

/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  ExportMarketShare: 'Sum of Market Share  must be  100 %'
};
