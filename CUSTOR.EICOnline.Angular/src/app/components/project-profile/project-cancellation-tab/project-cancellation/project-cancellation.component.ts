import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProjectCancellationService} from '../../../../Services/project-cancellation.service';
import {ProjectProfileService} from '../../../../Services/project-profile.service';
import {ProjectModel} from '../../../../model/project.model';
import {DataSharingService} from '../../../../Services/data-sharing.service';
import {MatSnackBar} from '@angular/material';
import {AccountService} from '@custor/services/security/account.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ErrorMessage} from '@custor/services/errMessageService';
import {ToastrService} from 'ngx-toastr';
import {CancellationReason} from '@custor/const/consts';
import {CancellationReasonModel} from '../../../../model/EnumModel';
import {ConfigurationService} from '@custor/services/configuration.service';
import {Lookup} from '../../../../model/lookupData';
import {ServiceApplicationService} from '../../../../Services/service-application.service';

@Component({
  selector: 'app-project-cancellation',
  templateUrl: './project-cancellation.component.html',
  styleUrls: ['./project-cancellation.component.scss']
})
export class ProjectCancellationComponent implements OnInit, AfterContentChecked {
  projectCancellationForm: FormGroup;
  loading = false;

  projectList: ProjectModel[];

  public isInvestor: boolean;
  private ServiceApplicationId: number;
  public editMode: boolean;
  private projectId: any;
  private InvestorId: string;
  private approval = false;
  public projectCancellationReasonList: any[];
  private currentLang: any;
  lookup: Lookup;

  constructor(public fb: FormBuilder,
              public projetServices: ProjectProfileService,
              public dataSharing: DataSharingService,
              public accountService: AccountService,
              public serviceApplication: ServiceApplicationService,
              public snackbar: MatSnackBar,
              public route: ActivatedRoute,
              public errMsg: ErrorMessage,
              public toastr: ToastrService,
              public configService: ConfigurationService,
              public projectCancellationServices: ProjectCancellationService) {
    this.lookup = new Lookup();
  }

  ngOnInit() {
    this.currentLang = this.configService.language;
    this.initStaticDataOwnerShip(this.currentLang);
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
          this.approval = true;
          this.getServiceApplicationCancellation();
        }
      });
  }

  initStaticDataOwnerShip(currentLang) {
    this.projectCancellationReasonList = [];

    let cancellationReason: CancellationReasonModel = new CancellationReasonModel();
    CancellationReason.forEach(pair => {
      cancellationReason = {
        'Id': pair.Id.toString(),
        'Desc': (currentLang === 'am' ? pair.Description : pair.DescriptionEng)
      };


      this.projectCancellationReasonList.push(cancellationReason);
    });
    // console.log(this.formOfOwnershipList);
  }

  initForm() {
    this.projectCancellationForm = this.fb.group({
      ProjectId: new FormControl(),
      ServiceId: '',
      // CancellationType: new FormControl(),
      CancellationReason: new FormControl(),
      // ApprovedBy: new FormControl(),
      CancellationDate: new FormControl(),
      CancellationRemark: new FormControl(),
      InvestorId: localStorage.getItem('InvestorId'),


    });
  }

  onSubmit() {
    this.projectCancellationServices.create(this.projectCancellationForm.value)
      .subscribe(result => {
        console.log(result);
        this.dataSharing.renewalIndex.next(2);
        localStorage.setItem('ServiceApplicationId', result.ServiceApplicationId.toString());
        this.notification('Project cancellation saved');
      });
  }

  getAllProjects() {
    this.projetServices.getProjectOnlyByInvestorId(+localStorage.getItem('InvestorId'))
      .subscribe(result => {
        this.projectList = result;
        console.log(this.projectList);
      });
  }

  notification(message: string) {
    this.toastr.success(` Succesfully ${message} .!`, 'Success');

    this.loading = false;
    this.snackbar.open(` Succesfully ${message} .!`, 'Close', {
      duration: 3000,
    });
  }

  ngAfterContentChecked(): void {
    this.projectCancellationForm.patchValue({
      ServiceId: localStorage.getItem('ServiceId'),
    });
    if (this.isInvestor) {
      this.projectCancellationForm.patchValue({
        ProjectId: localStorage.getItem('ProjectId'),
      });

    }
  }

  private getServiceApplicationCancellation() {
    this.projectCancellationServices.getCancellationByServiceApplicationId(this.ServiceApplicationId)
      .subscribe(result => {
        console.log(result.ProjectCancellation[0]);
        this.editMode = true;

        this.projectCancellationForm.patchValue(result.ProjectCancellation[0]);

        this.projectId = result.ProjectId;
        this.InvestorId = result.InvestorId;

        console.log(this.projectId);
      }, error => this.errMsg.getError(error));
  }

  approve() {
    if (this.approval) {
      this.projectCancellationForm.patchValue({
        ProjectId: this.projectId
      });
      this.projectCancellationForm.patchValue({
        InvestorId: this.InvestorId
      });
      // this.approveApplication(this.ServiceApplicationId);
      this.projectCancellationServices.update(this.projectCancellationForm.value, this.projectId)
        .subscribe(result => {
          this.toastr.success('cancellation successfully approved', 'Success');
          this.approveApplication(this.ServiceApplicationId);
        });
    }
  }

  approveApplication(id: any) {
    this.lookup.Code = 44449;
    this.serviceApplication.changeApplicationStatus(this.lookup, id)
      .subscribe(result => {
        this.toastr.success('Application Completed successfully ', 'Success');
      });
  }
}
