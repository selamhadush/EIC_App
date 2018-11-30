import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {FormService} from '@custor/validation/custom/form';
import {ErrorMessage} from '@custor/services/errMessageService';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {AssociateService} from '../../../Services/associate.service';
import {AssociateModel} from '../../../model/associate.model';
import {ProjectAssociateService} from '../../../Services/project-associate.service';
import {ProjectAssociateModel} from '../../../model/ProjectAssociate.model';
import {ServiceApplicationService} from '../../../Services/service-application.service';
import {ServiceapplicationService} from '../../setting/services-tabs/serviceApplication/serviceapplication.service';

@Component({
  selector: 'app-project-associate',
  templateUrl: './project-associate.component.html',
  styleUrls: ['./project-associate.component.scss']
})
export class ProjectAssociateComponent implements OnInit, AfterContentChecked {
  projectAssForm: FormGroup;
  projectId: number;
  public formErrors = {
    AssociateId: '',
    Postion: ''
  };
  dataSource: any;

  editMode = false;
  loading = false;
  shareEditIndex: number;
  associateData: ProjectAssociateModel[] = [];

  subscription: Subscription;
  displayedColumns = ['No', 'AssociateId', 'Action'];
  public steeperIndex: number;
  public associateList: AssociateModel[] = [];
  private ProjectAssociateId: number;
  public associate: ProjectAssociateModel;
  public associateIdList: number[] = [];

  constructor(private formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public serviceApplicationsServices: ServiceapplicationService,
              public router: Router,
              private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private dataSharing: DataSharingService,
              private formService: FormService,
              // private addressService: AddressService,
              private associateService: AssociateService,
              private projectAssociateService: ProjectAssociateService
  ) {
  }

  ngOnInit() {
    this.formBuild();
    this.getAllAssociate();
    // this.getAssociateByProject();

    this.route.params
      .subscribe((params: Params) => {
        this.projectId = +params['id'];
        if (this.projectId > 1) {
          this.getAssociateByProject();
        }
      });
  }

  getAssociateByProject() {
    this.projectAssociateService.associateProject(this.projectId).subscribe(result => {
      if (result.length > 0) {
        this.associateData = result;
        // this.dataSource = new MatTableDataSource<ProjectAssociateModel>(this.associateData);
        this.loading = false;
        this.updateList();
      }
    }, error => this.errMsg.getError(error));
  }

  onSubmit() {
    this.formService.markFormGroupTouched(this.projectAssForm);
    this.projectAssForm.removeControl('ProjectAssociateId');
    if (this.projectAssForm.valid) {
      if (!this.editMode) {
        this.projectAssociateService.create(this.projectAssForm.value)
          .subscribe(result => {
            if (this.associateData.length < 1) {
              // setTimeout(() => this.dataSharing.steeperIndex.next(6), 0);
              setTimeout(() => this.dataSharing.currentIndex.next(8), 0);
            }
            this.projectAssForm.addControl('ProjectAssociateId', new FormControl(''));
            this.associateData.push(result);
            this.dataSource = new MatTableDataSource<ProjectAssociateModel>(this.associateData);
            this.notification('saved');
            this.onClear();
          });
      } else {
        this.projectAssociateService.update(this.projectAssForm.value, this.ProjectAssociateId)
          .subscribe(result => {
            this.notification('updated');
            this.associateData[this.shareEditIndex] = result;
            this.dataSource = new MatTableDataSource<ProjectAssociateModel>(this.associateData);
            this.onClear();
          }, error => this.toastr.error(this.errMsg.getError(error)));
      }
    } else {
      this.formErrors = this.formService.validateForm(this.projectAssForm, this.formErrors, false);
    }
  }

  formBuild() {
    this.projectAssForm = this.formBuilder.group({
      ProjectId: new FormControl(['']),
      ProjectAssociateId: new FormControl(['']),
      workFlowId: new FormControl(['']),
      AssociateId: new FormControl(null),
      // Postion: new FormControl('', [Validators.required]),

    });

    this.projectAssForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formService.validateForm(this.projectAssForm, this.formErrors, true);
    });
  }


  private getAllAssociate() {
    this.associateService.getAssociateByInvestorId(+localStorage.getItem('InvestorId'))
      .subscribe(result => {
        this.associateList = result;
        this.updateList();
      });
  }

  updateList() {
    for (let i = 0; i < this.associateList.length; i++) {
      for (let j = 0; j < this.associateData.length; j++) {
        if (this.associateList[i].AssociateId === this.associateData[j].AssociateId) {
          this.associateList[i].selected = true;
          this.associateList[i].projectAssociate = this.associateData[j];
        } else {
          if (this.associateList[i].selected !== true) {
            this.associateList[i].selected = false;
          }
        }
      }
    }
    console.log(this.associateList);
    this.dataSource = new MatTableDataSource<AssociateModel>(this.associateList);

  }

  onClear() {
    this.editMode = false;
    this.projectAssForm.reset();
  }


  notification(message: string) {
    this.toastr.success(` Succesfully ${message} Data.!`, 'Success');
    this.loading = false;

  }


  ngAfterContentChecked(): void {
    this.projectAssForm.patchValue({
      ProjectId: localStorage.getItem('ProjectId')
    });
    this.projectAssForm.patchValue({
      workFlowId: localStorage.getItem('workFlowId')
    });
  }

  onMangerControlChanged($event, data?: AssociateModel) {
    console.log(data);
    const id = $event.source.value;
    this.projectAssForm.patchValue({
      AssociateId: id
    });
    this.projectAssForm.removeControl('ProjectAssociateId');
    if ($event.checked) {
      this.projectAssociateService.create(this.projectAssForm.value)
        .subscribe(result => {
          this.projectAssForm.addControl('ProjectAssociateId', new FormControl(''));
          this.associateData.push(result);
          this.getAssociateByProject();
          this.notification('saved');
          this.onClear();
        });
    } else if (!$event.checked) {
      this.projectAssociateService.delete(data.projectAssociate.ProjectAssociateId)
        .subscribe(result => {
          this.getAssociateByProject();
          this.notification('deleted');
          this.onClear();
        });
    }
    console.log($event.target);
    console.log($event);
    this.associateIdList.push($event.source.value);
    console.log(this.associateIdList);
  }

  newAssociate() {
    this.router.navigate(['associate/form/0']);
  }
  UpdateServiceApplication() {
    this.serviceApplicationsServices.finalForApprovalServiceApplications(
      localStorage.getItem('ServiceApplicationId'))
      .subscribe(result => {
        console.log(result);
        this.toastr.success('Application submitted successfully we will revise soon as well as  we will notify for any action required');
      });
  }
  next() {
    this.dataSharing.steeperIndex.next(8);

  }
}
