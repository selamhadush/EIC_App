import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProjectRenewalService} from '../../../../Services/project-renewal.service';
import {MatSnackBar} from '@angular/material';
import {DataSharingService} from '../../../../Services/data-sharing.service';
import {ProjectModel} from '../../../../model/project.model';
import {ProjectProfileService} from '../../../../Services/project-profile.service';
import {AccountService} from '@custor/services/security/account.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ErrorMessage} from '@custor/services/errMessageService';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-project-renewal',
  templateUrl: './project-renewal.component.html',
  styleUrls: ['./project-renewal.component.scss']
})
export class ProjectRenewalComponent implements OnInit, AfterContentChecked {
  projectRenewalForm: FormGroup;
  loading = false;
  public projectList: ProjectModel[];
  public isInvestor: boolean;
  private ServiceApplicationId: number;
  public editMode = false;
  private projectId: any;
  private InvestorId: any;
  private approval = false;

  constructor(public fb: FormBuilder,
              public snackbar: MatSnackBar,
              private accountService: AccountService,
              private projetServices: ProjectProfileService,
              public dataSharing: DataSharingService,
              public route: ActivatedRoute,
              public errMsg: ErrorMessage,
              public toastr: ToastrService,
              public projectRenewalService: ProjectRenewalService) {
  }

  ngOnInit() {
    this.initForm();
    this.getAllProjects();
    this.isInvestor = !this.accountService.getUserType();
    this.route.params
      .subscribe((params: Params) => {
        this.ServiceApplicationId = +params['id'];
        // this.projectId = this.route.snapshot.params['id'];
        if (this.ServiceApplicationId > 1) {
          // console.log(this.ServiceApplicationId);
          this.getServiceApplicationRenewal();
          this.approval = true;
        }
      });
  }

  initForm() {
    this.projectRenewalForm = this.fb.group({
      RenewalDate: new FormControl(),
      // ExpectedStartDate: new FormControl(),
      // ApprovedDate: new FormControl(),
      RenewedTo: new FormControl(),
      RenewedFrom: new FormControl(),
      ProjectId: '',
      InvestorId: '',
      ServiceId: ''
    });
  }

  getAllProjects() {
    this.projetServices.getProjectOnlyByInvestorId(+localStorage.getItem('InvestorId'))
      .subscribe(result => {
        this.projectList = result;
      });
  }

  onSubmit() {
    this.projectRenewalService.create(this.projectRenewalForm.value)
      .subscribe(response => {
        console.log(response);
        this.notification('Project renewal saved');
        localStorage.setItem('ServiceApplicationId', response.ServiceApplicationId.toString());
        localStorage.setItem('workFlowId', response.ServiceApplication[0].ServiceWorkflow[0].ServiceWorkflowId);

        this.dataSharing.renewalIndex.next(2);

      });
  }

  ngAfterContentChecked() {
    this.projectRenewalForm.patchValue({
      ServiceId: localStorage.getItem('ServiceId'),
      InvestorId: localStorage.getItem('InvestorId'),
      // ProjectId: localStorage.getItem('ProjectId'),
    });
    if (this.isInvestor) {
      this.projectRenewalForm.patchValue({
        ProjectId: localStorage.getItem('ProjectId'),
      });
    }
  }

  private getServiceApplicationRenewal() {
    this.projectRenewalService.getRenewalByServiceApplicationId(this.ServiceApplicationId).subscribe(result => {
      console.log(result.ProjectRenewal[0]);
      this.editMode = true;
      this.projectRenewalForm.patchValue(result.ProjectRenewal[0]);
      this.projectId = result.ProjectId;
      this.InvestorId = result.InvestorId;
    }, error => this.errMsg.getError(error));
  }

  notification(message: string) {
    this.toastr.success(` Succesfully ${message} Data.!`, 'Success');

    this.loading = false;
    this.snackbar.open(` Succesfully ${message} Data.!`, 'Close', {
      duration: 3000,
    });
  }


  approve() {
    if (this.approval) {
      this.projectRenewalForm.patchValue({
        ProjectId: this.projectId
      });
      this.projectRenewalForm.patchValue({
        InvestorId: this.InvestorId
      });


    }
    this.projectRenewalService.create(this.projectRenewalForm.value).subscribe(result => {
      this.toastr.success('Renewal  successfully approved', 'Success');
    });
  }
}
