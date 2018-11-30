import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectNationalityCompositionService} from '../../../Services/project-nationality-composition.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddressService} from '../../../Services/Address/address.service';
import {NationalityModel} from '../../../model/address/NationalityModel';
import {Subscription} from 'rxjs/Subscription';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {ProjectNationalityCompositionModel} from '../../../model/ProjectNationalityComposition.model.';
import {MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {ErrorMessage} from '@custor/services/errMessageService';
import {FormService} from '@custor/validation/custom/form';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {InvestorService} from '../../investor/investor.service';
import {Investor} from '../../../model/investor';

@Component({
  selector: 'app-project-share',
  templateUrl: './project-share.component.html',
  styleUrls: ['./project-share.component.css']
})
export class ProjectShareComponent implements OnInit, OnDestroy, AfterContentChecked {
  projectShareForm: FormGroup;
  projectId: number;
  public formErrors = {
    Nationality: '',
    Qty: '',
    SharePercent: ''
  };
  dataSource: any;
  nationList: NationalityModel[] = [];
  editMode = false;
  loading = false;
  shareEditIndex: number;
  ProjectNationalityCompositionId: number;
  nationalityCompositionData: ProjectNationalityCompositionModel[] = [];
  private productShare: ProjectNationalityCompositionModel;

  subscription: Subscription;
  displayedColumns = ['No', 'Nationality', 'Qty', 'SharePercent', 'Description', 'Action'];
  public steeperIndex: number;
  public isSol: boolean;
  public InvestorDetial: Investor;

  constructor(private formBuilder: FormBuilder,
              private snackbar: MatSnackBar,
              public route: ActivatedRoute,
              public invService: InvestorService,
              public projectProfileService: ProjectProfileService,
              private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private dataSharing: DataSharingService,
              private formService: FormService,
              private addressService: AddressService,
              private nationalityCompositionService: ProjectNationalityCompositionService) {
  }

  ngOnInit() {
    this.formBuild();
    this.getAllNation();
    this.getInvestorType();
    this.route.params
      .subscribe((params: Params) => {
        this.projectId = +params['id'];
        if (this.projectId > 1) {
          this.getNationalityCompositionsByProject();
        }
      });
  }

  getNationalityCompositionsByProject() {
    this.nationalityCompositionService.NationalityCompositionsByProject(this.projectId).subscribe(result => {
      if (result.length > 0) {
        this.nationalityCompositionData = result;
        this.dataSource = new MatTableDataSource<ProjectNationalityCompositionModel>(this.nationalityCompositionData);
        this.loading = false;
      }
    }, error => this.errMsg.getError(error));
  }

  onSubmit() {
    this.formService.markFormGroupTouched(this.projectShareForm);
    this.projectShareForm.removeControl('ProjectNationalityCompositionId');
    if (this.projectShareForm.valid) {
      if (!this.editMode) {
        this.nationalityCompositionService.create(this.projectShareForm.value)
          .subscribe(result => {
            if (this.nationalityCompositionData.length < 1) {
              // setTimeout(() => this.dataSharing.steeperIndex.next(6), 0);
              setTimeout(() => this.dataSharing.currentIndex.next(7), 0);
            }
            this.projectShareForm.addControl('ProjectNationalityCompositionId', new FormControl(''));
            this.nationalityCompositionData.push(result);
            this.dataSource = new MatTableDataSource<ProjectNationalityCompositionModel>(this.nationalityCompositionData);
            this.notification('saved');
            this.onClear();
          });
      } else {
        this.nationalityCompositionService.update(this.projectShareForm.value, this.ProjectNationalityCompositionId)
          .subscribe(result => {
            this.notification('updated');
            this.nationalityCompositionData[this.shareEditIndex] = result;
            this.dataSource = new MatTableDataSource<ProjectNationalityCompositionModel>(this.nationalityCompositionData);
            this.onClear();
          }, error => this.toastr.error(this.errMsg.getError(error)));
      }
    } else {
      this.formErrors = this.formService.validateForm(this.projectShareForm, this.formErrors, false);
    }
  }

  formBuild() {
    this.projectShareForm = this.formBuilder.group({
      ProjectId: new FormControl(['']),
      ProjectNationalityCompositionId: new FormControl(''),
      workFlowId: new FormControl(['']),
      Nationality: new FormControl(null, [Validators.required, this.checkNationality.bind(this)]),
      Qty: new FormControl('', [Validators.required]),
      SharePercent: new FormControl(null, [Validators.required, this.validateTotal.bind(this)]),
      Description: new FormControl(null, Validators.minLength(2))
    });

    this.projectShareForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formService.validateForm(this.projectShareForm, this.formErrors, true);
    });
  }

  deleteShare(index: number, id: number) {
    this.nationalityCompositionService.delete(id)
      .subscribe(() => {
        this.notification('Deleted');
        this.nationalityCompositionData.splice(index, 1);
        this.dataSource = new MatTableDataSource<ProjectNationalityCompositionModel>(this.nationalityCompositionData);
      });
  }

  private getAllNation() {
    this.addressService.getNationality()
      .subscribe(result => {
        this.nationList = result;
      });
  }

  onClear() {
    this.editMode = false;
    this.projectShareForm.reset();
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  notification(message: string) {
    this.toastr.success(` Succesfully ${message} Data.!`, 'Success');

    this.loading = false;
    this.snackbar.open(`Succesfully ${message} Data.!`, 'Close', {
      duration: 3000,
    });
  }

  onEditShare(index: number, id: number) {
    this.editMode = true;
    this.ProjectNationalityCompositionId = id;
    this.shareEditIndex = index;
    this.productShare = this.nationalityCompositionData[index];
    this.projectShareForm.patchValue(this.productShare);
  }


  checkNationality(input: FormControl): { [message: string]: boolean } {
    if (typeof (this.nationalityCompositionData) !== 'undefined' && !this.editMode) {
      for (const nation of this.nationalityCompositionData) {
        if (input.value === nation.Nationality) {
          return {value: true};
        }
      }
    }
    return null;
  }

  validateTotal(input: FormControl): { [message: string]: boolean } {
    let total = 0;
    if (typeof (this.nationalityCompositionData) !== 'undefined') {
      for (const nation of this.nationalityCompositionData) {
        total = total + nation.SharePercent + input.value;
      }
      if (total > 100) {
        return {value: true};
      }
    }
    return null;
  }

  private getInvestorType() {
    this.invService.getInvestor(localStorage.getItem('InvestorId'))
      .subscribe((result: Investor) => {
        this.InvestorDetial = result;
        console.log(result);
        if (result.LegalStatus === 1) {
          this.isSol = true;
        } else {
          this.isSol = false;
        }
        if (!this.isSol && this.projectId < 1) {
          setTimeout(() => this.dataSharing.currentIndex.next(7), 0);
        }
      });
  }

  ngAfterContentChecked(): void {
    this.projectShareForm.patchValue({
      ProjectId: localStorage.getItem('ProjectId')
    });
    this.projectShareForm.patchValue({
      workFlowId: localStorage.getItem('workFlowId')
    });
  }

  next() {
    this.dataSharing.steeperIndex.next(6);

  }
}
