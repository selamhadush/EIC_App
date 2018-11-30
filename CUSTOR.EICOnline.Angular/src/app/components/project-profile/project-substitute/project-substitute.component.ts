import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {AccountService} from '@custor/services/security/account.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ErrorMessage} from '@custor/services/errMessageService';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {ProjectModel} from '../../../model/project.model';
import {MatSnackBar} from '@angular/material';
import {ProjectSubstituteService} from '../../../Services/project-substitute.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-project-substitute',
  templateUrl: './project-substitute.component.html',
  styleUrls: ['./project-substitute.component.scss']
})
export class ProjectSubstituteComponent implements OnInit, AfterContentChecked {

  projectsubstituteForm: FormGroup;
  loading = false;

  projectList: ProjectModel[];
  CancellationReasonData = [
    // {'type': 'Own Interest'},
    // {'type': 'by law'},
    {'type': 'Lose'},
    // {'type': 'By Authority'},
    // {'type': 'Sales'},
    // {'type': 'Late Renewal'}
  ];
  public isInvestor: boolean;
  private ServiceApplicationId: number;
  public editMode: boolean;

  constructor(public fb: FormBuilder,
              public projetServices: ProjectProfileService,
              public dataSharing: DataSharingService,
              public accountService: AccountService,
              public snackbar: MatSnackBar,
              public route: ActivatedRoute,
              public errMsg: ErrorMessage,
              private toast: ToastrService,
              public substituteService: ProjectSubstituteService) {
  }

  ngOnInit() {
    this.initForm();
    this.editMode = false;
    this.getAllProjects();
    this.isInvestor = !this.accountService.getUserType();
    this.route.params
      .subscribe((params: Params) => {
        this.ServiceApplicationId = +params['id'];
        // this.projectId = this.route.snapshot.params['id'];
        if (this.ServiceApplicationId > 1) {
          // console.log(this.ServiceApplicationId);
          this.getServiceApplicationSubstitute();
        }
      });
  }

  initForm() {
    this.projectsubstituteForm = this.fb.group({
      ProjectId: new FormControl(),
      ServiceId: '',
      // CancellationType: new FormControl(),
      Reason: new FormControl(),
      // ApprovedBy: new FormControl(),
      // CancellationDate: new FormControl(),
      SubstituteRemark: new FormControl(),
      InvestorId: localStorage.getItem('InvestorId'),


    });
  }

  onSubmit() {
    // localStorage.removeItem('ServiceApplicationId');
    // localStorage.removeItem('workFlowId');
    this.substituteService.create(this.projectsubstituteForm.value)
      .subscribe(result => {
        console.log(result);
        this.dataSharing.renewalIndex.next(2);
        localStorage.setItem('ServiceApplicationId', result.ServiceApplicationId.toString());
        localStorage.setItem('workFlowId', result.ServiceApplication.ServiceWorkflow[0].ServiceWorkflowId);


        this.toast.success('Request for substitute  has been sent', 'success!!');
      });
  }

  getAllProjects() {
    this.projetServices.getProjectOnlyByInvestorId(+localStorage.getItem('InvestorId'))
      .subscribe(result => {
        this.projectList = result;
      });
  }

  notification(message: string) {
    this.loading = false;
    this.toast.success(` Succesfully ${message} Data.!`, 'success!!');

    this.snackbar.open(` Succesfully ${message} Data.!`, 'Close', {
      duration: 3000,
    });
  }

  ngAfterContentChecked(): void {
    this.projectsubstituteForm.patchValue({
      ServiceId: localStorage.getItem('ServiceId'),
    });
    if (this.isInvestor) {
      this.projectsubstituteForm.patchValue({
        ProjectId: localStorage.getItem('ProjectId'),
      });
    }
  }

  private getServiceApplicationSubstitute() {
    this.substituteService.getSubstituteByServiceApplicationId(this.ServiceApplicationId).subscribe(result => {
      console.log(result.ProjectSubstitute[0]);
      this.editMode = true;
      this.projectsubstituteForm.patchValue(result.ProjectSubstitute[0]);
    }, error => this.errMsg.getError(error));
  }
}
