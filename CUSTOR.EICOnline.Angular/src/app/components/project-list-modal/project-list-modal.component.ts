import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectProfileService} from '../../Services/project-profile.service';
import {ProjectModel} from '../../model/project.model';
import {AccountService} from '@custor/services/security/account.service';
import {IncentiveLogModel} from '../../model/IncentiveLog.model';
import {IncentiveLogService} from '../../Services/incentive-log.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Utilities} from '@custor/helpers/utilities';
import {Investor} from '../../model/investor';
import {ServiceapplicationService} from '../setting/services-tabs/serviceApplication/serviceapplication.service';
import {ServiceApplicationModel} from '../../model/ServiceApplication.model';

@Component({
  selector: 'app-project-list-modal',
  templateUrl: './project-list-modal.component.html',
  styleUrls: ['./project-list-modal.component.scss']
})
export class ProjectListModalComponent implements OnInit {
  public projectList: ProjectModel[];
  m: IncentiveLogModel;
  public ProjectId: any;
  public inId: number;
  public title: string;
  dataSource2: any;
  public serviceApplication: ServiceApplicationModel;
  displayedColumnsProject = ['No', 'ProjectName', 'startDate', 'InvestmentActivity', 'status', 'Action'];
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  sourceInvestor: Investor;
  loadingIndicator: boolean;

  constructor(private projetServices: ProjectProfileService,
              private accountService: AccountService,
              private serviceapplicationService: ServiceapplicationService,
              private toastr: ToastrService,
              private router: Router,
              private incentiveLogService: IncentiveLogService) {
    this.m = new IncentiveLogModel();
    this.serviceApplication = new ServiceApplicationModel();
  }

  ngOnInit() {
    this.getAllProjects();
    this.select(localStorage.getItem('InvestorId'));
  }

  getAllProjects() {
    this.projetServices.getProjectOnlyByInvestorId(+localStorage.getItem('InvestorId'))
      .subscribe(result => {
        this.projectList = result;
      });
  }

  select(InvestorId: any) {
    localStorage.setItem('InvestorId', InvestorId);
    this.loadingIndicator = true;
    this.projetServices.getProjectByInvestorId(InvestorId)
      .subscribe(result => {
          this.projectList = result;
          console.log(result);
          this.title = 'ProjectDetail';
          // this.investorShow = false;
          if (!this.projectList) {
            this.loadingIndicator = false;
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            this.loadingIndicator = false;
            this.dataSource2 = new MatTableDataSource<ProjectModel>(result);
            console.log(result);
            this.dataSource2.paginator = this.paginator2;
          }
        },
        error => {
          this.toastr.error(`Error: "${Utilities.getHttpResponseMessage(error)}"`);
        });
    this.loadingIndicator = false;

  }

  setProjectId(projectId: any) {
    this.ProjectId = projectId;
    // this.IncentiveRouting();
    console.log(projectId);
  }

  go(projectId: any, applicationId: any, ServiceId: any, InvestorId: any) {

    if (+localStorage.getItem('ServiceId') === 1023) {
      this.router.navigate(['pro/', projectId]);
      localStorage.setItem('ParentProjectId', projectId);
    } else {
      localStorage.removeItem('ServiceApplicationId');
      localStorage.setItem('ProjectId', projectId);
      this.serviceApplication.ProjectId = projectId;
      this.serviceApplication.ServiceId = localStorage.getItem('ServiceId');
      this.serviceApplication.InvestorId = InvestorId;
      this.serviceApplication.CaseNumber = '1';
      this.serviceApplication.CurrentStatusId = 44450;
      this.serviceApplication.IsSelfService = true;
      this.serviceApplication.IsPaid = true;
      this.serviceApplication.CreatedUserId = 1;
      this.serviceApplication.IsActive = false;
      this.serviceapplicationService.create(this.serviceApplication)
        .subscribe(result => {
          localStorage.setItem('ServiceApplicationId', result.ServiceApplicationId);
          localStorage.setItem('workFlowId', result.ServiceWorkflow[0].ServiceWorkflowId);

          this.view(localStorage.getItem('ServiceId'), 'Incentive');
        });

      // this.router.navigate(['/incentive-services']);
    }


  }

  view(serviceId: any, name: any) {
    this.title = name;
    console.log(serviceId);
    switch (serviceId) {

      case '1047':
        this.router.navigate(['bill-of-material/1', 0]);
        break;
      case '1054':
        this.router.navigate(['/bill-of-material/2', 0]);
        break;
      case '1046':
        this.router.navigate(['incentive-request-item/', 0]);
        break;
      case '1045':
        this.router.navigate(['tax-exemption/', 0]);
        break;
      case '1236':
        this.router.navigate(['business-tab/0/', 0]);
        break;

    }
  }

  back() {
    window.history.back();
  }

}
