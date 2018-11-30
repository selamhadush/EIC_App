import {AfterContentChecked, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {InvestorService} from '../investor/investor.service';
import {AccountService} from '@custor/services/security/account.service';
import {AuthService} from '@custor/services/security/auth.service';
import {Utilities} from '@custor/helpers/utilities';
import {Investor} from '../../model/investor';
import {ProjectModel} from '../../model/project.model';
import {DataSharingService} from '../../Services/data-sharing.service';
import {ProjectProfileService} from '../../Services/project-profile.service';
import {AngConfirmDialogComponent} from '@custor/components/confirm-dialog/confirm-dialog.component';
import {IncentiveLogService} from '../../Services/incentive-log.service';
import {ServiceApplicationModel} from '../../model/ServiceApplication.model';
import {ServiceapplicationService} from '../setting/services-tabs/serviceApplication/serviceapplication.service';
import {TodoTaskModel} from '../../model/TodoTask.model';
import {ServiceModel} from '../../model/Service.model';
import {Permission} from "../../model/security/permission.model";

@Component({
  selector: 'app-search-browser',
  templateUrl: './search-browser.component.html',
  styleUrls: ['./search-browser.component.scss']
})
export class SearchBrowserComponent implements OnInit, AfterContentChecked {

  title: string;
  serviceTitle: string;
  dataSource: any;
  investorShow = true;
  loadingIndicator: boolean;
  loading = true;
  searchForm: FormGroup;
  serviceList: ServiceModel[] = [];
  displayedColumns = [
    'FirstNameEng', 'FatherNameEng', 'RegistrationNumber', 'RegistrationDate', 'Tin', 'Action'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumnsProject = [
    'ProjectName', 'startDate', 'InvActivity', 'ProjectStage', 'ProjectStatus', 'Action'
  ];
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;
  formErrors: {};
  private investors: Investor[];
  private projectList: ProjectModel[];
  public invName: any;
  todoTask: TodoTaskModel;
  public serviceApplication: ServiceApplicationModel;
  public projectName: string | null;
  public investorName: string | null;

  constructor(public fb: FormBuilder,
              private http: HttpClient,
              private invService: InvestorService,
              private projectService: ProjectProfileService,
              private dataSharing: DataSharingService,
              private accountService: AccountService,
              private authService: AuthService,
              private serviceApplicationService: ServiceapplicationService,
              private incentiveLogService: IncentiveLogService,
              private toastr: ToastrService, public dialog: MatDialog,
              private router: Router, private route: ActivatedRoute) {
    this.serviceApplication = new ServiceApplicationModel();
    this.todoTask = new TodoTaskModel();
  }

  ngOnInit() {
    this.initForm();
    this.getInvestors();
    // this.serviceTitle = localStorage.getItem('title');
    this.title = localStorage.getItem('title');
    this.projectName = localStorage.getItem('projectName');
    this.investorName = localStorage.getItem('investorName');
  }

  search() {
    this.loadingIndicator = true;
    this.invService.searchInvestor(this.searchForm.value)
      .subscribe(result => {
          console.log(result);
          this.investors = result;
          if (!this.investors) {
            this.loadingIndicator = false;
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            this.loadingIndicator = false;
            this.dataSource = new MatTableDataSource<Investor>(result);
            console.log(result);
            this.dataSource.paginator = this.paginator;
          }
        },
        error => {
          this.toastr.error(`Error: "${Utilities.getHttpResponseMessage(error)}"`);
        });
    this.loadingIndicator = false;
  }

  initForm() {
    this.searchForm = this.fb.group({
      Tin: new FormControl(),
      FirstNameEng: new FormControl(),
      FatherNameEng: new FormControl(),
      GrandNameEng: new FormControl()
    });
  }

  getInvestors() {
    this.loadingIndicator = true;
    this.invService.getInvestors()
      .subscribe(result => {
          console.log(result);
          this.investors = result;
          if (!this.investors) {
            this.loadingIndicator = false;
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            this.loadingIndicator = false;

            this.dataSource = new MatTableDataSource<Investor>(result);
            console.log(result);
            this.dataSource.paginator = this.paginator;
          }
        },
        error => {
          this.toastr.error(`Error: "${Utilities.getHttpResponseMessage(error)}"`);
        });
    this.loadingIndicator = false;
  }

  select(InvestorId: any, investorName: any) {
    localStorage.setItem('InvestorId', InvestorId);
    this.invName = investorName;
    this.loadingIndicator = true;
    this.projectService.getProjectByInvestorId(InvestorId)
      .subscribe(result => {
          this.projectList = result;
          this.title = 'ProjectDetail';
          this.investorShow = false;
          if (!this.projectList) {
            this.loadingIndicator = false;
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            this.loadingIndicator = false;
            this.dataSource = new MatTableDataSource<ProjectModel>(result);
            console.log(result);
            this.dataSource.paginator = this.paginator;
          }
        },
        error => {
          this.toastr.error(`Error: "${Utilities.getHttpResponseMessage(error)}"`);
        });
    this.loadingIndicator = false;

  }


  editInvestor(investor: Investor) {
    if (investor) {
      this.router.navigate(['/investor/edit', investor.InvestorId], {relativeTo: this.route});
    } else {
      this.router.navigate(['/investor/edit', 0]);
    }
  }

  confirmDelete(investor: Investor) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.invService.deleteInvestor(investor.InvestorId)
          .subscribe(results => {
              this.loadingIndicator = false;
              this.dataSource.data = this.dataSource.data.filter(item => item !== investor);
            },
            error => {
              // tslint:disable-next-line:max-line-length
              this.toastr.error(
                `An error occured whilst deleting the investor.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                'Delete Error');
            });
      }
      this.loadingIndicator = false;
    });
  }

  back() {
    this.title = 'search';
    this.investorShow = true;
    this.getInvestors();

  }

  deleteProject(id: number) {
    console.log(id);
    const response = confirm('Do you want to Delete this Project ?');
    if (response === true) {
      this.projectService.delete(id)
        .subscribe(() => {
          // this.getAllServiceApplication();
        });
      return true;
    } else {
      return false;
    }
  }

  editProject(projectId: number, serviceApplicationId: any, serviceId: any) {
    localStorage.setItem('ServiceApplicationId', serviceApplicationId);
    localStorage.setItem('ServiceId', serviceId);
    // localStorage.setItem('title', title);
    console.log(serviceId);
    setTimeout(() => this.dataSharing.steeperIndex.next(1), 0);

    setTimeout(() => this.dataSharing.isNew.next(true), 0);
    this.router.navigate(['pro/', projectId]);
  }


  projectDetail(id: number) {
    console.log(this.router.url);
    this.router.navigate(['/service-detail', id]);
  }

// Todo Application must be Intiated
  goToService(InvestorId: any, investorName: any) {
    localStorage.setItem('investorName', investorName);
    const serviceId = +localStorage.getItem('ServiceId');
    if (serviceId === 13) {
      setTimeout(() => this.dataSharing.currentIndex.next(0), 0);

      localStorage.setItem('currentIndex', '0');
      this.router.navigate(['/pro', 0]);
      localStorage.setItem('InvestorId', InvestorId);
    } else {
      this.select(InvestorId, investorName);

    }

  }

  nextService(projectId: any, ServiceApplicationId: any, ServiceId: any, projectStatus: any) {

    const serviceId = +localStorage.getItem('ServiceId');

    localStorage.setItem('ProjectId', projectId);
    switch (serviceId) {
      case 13:
        this.router.navigate(['/pro', 0]);
        break;
      case 18:
        if (projectStatus !== 4) {
          this.router.navigate(['/project-renewal', 0]);
          localStorage.setItem('ProjectId', projectId);
        } else {
          this.toastr.error('you can not renew this project it already cancelled', 'Not Allowed');
        }
        break;
      case 19:
        if (projectStatus !== 4) {
          this.router.navigate(['/project-cancellation', 0], {relativeTo: this.route});
          localStorage.setItem('ProjectId', projectId);
        } else {
          this.toastr.error('you can not Cancelled  this project it already cancelled', 'Not Allowed');
        }
        break;
      case 1023:
        if (projectStatus !== 4) {
          this.router.navigate(['pro/', projectId]);
          localStorage.setItem('ParentProjectId', projectId);
        } else {
          this.toastr.error('you can not Expand  this project it already cancelled', 'Not Allowed');
        }

        break;
      case 1234:
        this.router.navigate(['/after-care']);
        break;
      case 1028:
        this.editProject(projectId, ServiceApplicationId, 13);
        break;
      case 1027:
        localStorage.setItem('ServiceApplicationId', ServiceApplicationId);
        localStorage.setItem('ServiceId', serviceId.toString());
        this.router.navigate(['/project-substitute', 0], {relativeTo: this.route});
        break;
      case 1045:
        this.router.navigate(['/tax-exemption/', 0]);
        break;
      case 1046:
        this.router.navigate(['/incentive-request-item/', 0]);
        break;

      case 1047:
        this.router.navigate(['bill-of-material/1', 0]);
        break;
      case 1054:
        this.router.navigate(['bill-of-material/2', 0]);
        break;
      case 1001:
        this.router.navigate(['capital-registration/', projectId]);
        break;
      default:
        this.router.navigate(['/notfound'], {relativeTo: this.route});
        break;
    }

  }

  startApplication(projectId: any, ServiceApplicationId: any, ServiceId: any, projectStatus: any, projectName?: any) {
    if (projectStatus !== 9) {
      this.toastr.warning('Project Is Not Active');
    } else {
      console.log(projectName);
      this.todoTask.AssignedUserId = this.accountService.currentUser.Id;
      this.todoTask.CreatedUserId = this.accountService.currentUser.Id;
      this.todoTask.CreatedUserName = this.accountService.currentUser.UserName;
      this.todoTask.IsActive = false;

      this.serviceApplication.ProjectId = projectId;
      this.serviceApplication.ServiceId = localStorage.getItem('ServiceId');
      this.serviceApplication.InvestorId = localStorage.getItem('InvestorId');
      this.serviceApplication.CaseNumber = '1';
      this.serviceApplication.CurrentStatusId = 44450;
      this.serviceApplication.IsSelfService = true;
      this.serviceApplication.IsPaid = true;
      this.serviceApplication.CreatedUserId = 1;
      this.serviceApplication.IsActive = false;
      this.serviceApplication.todoTask = this.todoTask;

      this.serviceApplicationService.applicationStart(this.serviceApplication)
        .subscribe(result => {
          localStorage.setItem('ServiceApplicationId', result.ServiceApplicationId);
          localStorage.setItem('workFlowId', result.ServiceWorkflow[0].ServiceWorkflowId);
          this.nextService(projectId, result.ServiceApplicationId, ServiceId, projectStatus);
        });
      localStorage.setItem('projectName', projectName);
    }
  }

  get canViewTasks() {
    return this.accountService.userHasPermission(Permission.viewServiceList);
  }

  get canManageAftercareData() {
    return this.accountService.userHasPermission(Permission.ManageAftercareDataPermission);
  }

  ngAfterContentChecked(): void {
    this.serviceTitle = localStorage.getItem('title');
    this.title = localStorage.getItem('title');
    this.projectName = localStorage.getItem('projectName');
    this.investorName = localStorage.getItem('investorName');
  }

}
