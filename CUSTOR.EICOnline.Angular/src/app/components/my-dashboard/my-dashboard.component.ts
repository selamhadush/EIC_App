import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ServiceModel} from '../../model/Service.model';
import {ServiceService} from '../../Services/service.service';
import {ServiceapplicationService} from '../setting/services-tabs/serviceApplication/serviceapplication.service';
import {ServiceApplicationModel} from '../../model/ServiceApplication.model';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectProfileService} from '../../Services/project-profile.service';
import {AccountService} from '@custor/services/security/account.service';
import {DataSharingService} from '../../Services/data-sharing.service';
import {FormService} from '@custor/validation/custom/form';
import {ErrorMessage} from '@custor/services/errMessageService';
import {NotificationService} from '../../Services/notification.service';
import {NotificationModel} from '../../model/Notification.model';
import {Utilities} from '@custor/helpers/utilities';
import {Investor} from '../../model/investor';
import {ToastrService} from 'ngx-toastr';
import {InvestorService} from '../investor/investor.service';
import {Permission} from '../../model/security/permission.model';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit, AfterViewInit {
  public serviceApplicationList: ServiceApplicationModel[];
  public notitficationList: NotificationModel[];
  isChecked = false;
  // dataSource: any;
  public dataSource: MatTableDataSource<ServiceApplicationModel>;

  loading = true;
  searchForm: FormGroup;
  serviceList: ServiceModel[] = [];
  displayedColumns = ['CaseNumber', 'ServiceName', 'ProjectName', 'currentStatus', 'NextStep', 'Action'];
  displayedColumnsNotification = ['subject', 'date', 'message', 'Action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatPaginator) paginator2: MatPaginator;

  formErrors: {};
  public dataSourceNotitification: MatTableDataSource<NotificationModel>;
  private investors: Investor[];

  constructor(private projectProfileService: ProjectProfileService,
              private errMsg: ErrorMessage,
              private router: Router,
              private toastr: ToastrService,
              private invService: InvestorService,
              private dataSharing: DataSharingService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private accountService: AccountService,
              private service: ServiceService,
              private formBuilder: FormBuilder,
              private formService: FormService,
              private notifificationService: NotificationService,
              private serviceApplication: ServiceapplicationService) {
  }

  ngOnInit() {

    this.checkAuthorization();
    setTimeout(() => this.dataSource.paginator = this.paginator);

    this.getAllNotification(this.accountService.currentUser.Id);
    this.checkInvestor();

  }

  toServiceList() {
    // this.dialog.open(CustomerServiceStarterComponent);
    this.router.navigate(['/service-list']);


  }

  getServiceApplication() {
    this.serviceApplication.getServiceApplicationsByInvestorId(localStorage.getItem('InvestorId'))
      .subscribe(result => {
        this.dataSource = new MatTableDataSource<ServiceApplicationModel>(result);
        this.loading = false;
        this.serviceApplicationList = result;
        // this.dataSource.paginator = this.paginator;
      }, error => this.errMsg.getError(error));
  }

  nextStep(step: number, projectId: any, serviceApplicationId: any, serviceId: any, title: string, workFlowId: any,
           investorName: string, projectName: string) {
    let stepIndex;
    console.log(projectId);
    localStorage.setItem('title', 'New Ip');

    if (serviceId === 1045) {
      this.router.navigate(['/tax-exemption/', 0]);
    } else if (serviceId === 1046) {
      this.router.navigate(['/incentive-request-item/', 0]);
    }
    if (serviceId === 1047) {
      this.router.navigate(['/bill-of-material/', 1]);
    }
    if (serviceId === 1054) {
      this.router.navigate(['/bill-of-material/', 2]);
    } else {
      switch (step) {
        case 8:
          stepIndex = 1;
          break;
        case 9:
          stepIndex = 4;
          break;
        case 10:
          stepIndex = 5;
          break;
        case 11:
          stepIndex = 2;
          break;
        case 12:
          stepIndex = 7;
          break;
        case 13:
          stepIndex = 2;
          break;
        case 14:
          stepIndex = 6;
          break;
        case 18:
          stepIndex = 8;
          break;
      }
      console.log(stepIndex);
      this.router.navigate(['pro/', projectId]);
    }
    localStorage.setItem('ServiceId', serviceId);
    localStorage.setItem('ProjectId', projectId);
    localStorage.setItem('ServiceApplicationId', serviceApplicationId);
    localStorage.setItem('workFlowId', workFlowId);
    localStorage.setItem('investorName', investorName);
    localStorage.setItem('projectName', projectName);

    setTimeout(() => this.dataSharing.steeperIndex.next(stepIndex), 0);
    setTimeout(() => this.dataSharing.currentIndex.next(stepIndex), 0);
    localStorage.setItem('CurrentIndex', stepIndex.toString());
  }

  getAllNotification(userId: any) {
    this.notifificationService.getAllById(userId)
      .subscribe(result => {
        this.dataSourceNotitification = new MatTableDataSource<NotificationModel>(result);
        this.loading = false;
        this.notitficationList = result;
        console.log(this.notitficationList);
        // this.dataSourceNotitification.paginator = this.paginator2;
      }, error => this.errMsg.getError(error));
  }

  deleteServiceApplication(id: any) {
    console.log(id);
    const response = confirm('Do you want to Delete this ServiceApplication ?');
    if (response === true) {
      this.serviceApplication.delete(id).subscribe(result => {
        console.log(result);
        this.getServiceApplication();
      });
      return true;
    } else {
      return false;
    }

  }

  deleteProject(id: number) {
    console.log(id);
    const response = confirm('Do you want to Delete this Project ?');
    if (response === true) {
      this.projectProfileService.delete(id)
        .subscribe(() => {
          this.getServiceApplication();
        });
      return true;
    } else {
      return false;
    }
  }

  editProject(projectId: number, serviceApplicationId: any, serviceId: any) {
    localStorage.setItem('ServiceApplicationId', serviceApplicationId);
    localStorage.setItem('ServiceId', serviceId);
    setTimeout(() => this.dataSharing.isNew.next(true), 0);
    this.router.navigate(['pro/', projectId]);
  }

  projectDetail(id: any, ServiceApplicationId: any, serviceId: any) {
    console.log(id);
    localStorage.setItem('ServiceApplicationId', ServiceApplicationId);
    localStorage.setItem('ProjectId', id);
    switch (serviceId) {
      case 13 || 1023:
        // this.router.navigate(['/officer']);
        this.router.navigate(['/service-detail', id]);

        break;
      case 18:
        this.router.navigate(['/project-renewal', ServiceApplicationId]);
        break;
      case 19:
        this.router.navigate(['/project-cancellation', ServiceApplicationId], {relativeTo: this.route});
        break;
      case 1027:
        this.router.navigate(['/project-substitute', ServiceApplicationId], {relativeTo: this.route});
        break;
      case 1045:
        this.router.navigate(['tax-exemption/', ServiceApplicationId]);
        break;
      case 1046:
        this.router.navigate(['incentive-request-item/', ServiceApplicationId]);
        break;
      case 1047:
        this.router.navigate(['/bill-of-material/1/', ServiceApplicationId]);
        break;
      case 1054:
        this.router.navigate(['/bill-of-material/2/', ServiceApplicationId]);
        break;
      case 1235:
        this.router.navigate(['investor-tab/' + serviceId + '/' + ServiceApplicationId]);
        break;
      case 1236:
        this.router.navigate(['business-tab/' + serviceId + '/' + ServiceApplicationId]);
        break;
      default:
        this.router.navigate(['/notfound'], {relativeTo: this.route});
        break;
    }
  }

  search() {
    // alert(this.isChecked);
    this.isChecked = !this.isChecked;
    if (this.isChecked) {
      this.filterData(this.serviceApplicationList);
    } else {
      this.getServiceApplication();
    }

  }

  filterData(data: any) {
    console.log(data);
    this.serviceApplicationList = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].IsActive === false) {
        this.serviceApplicationList.push(data[i]);
      }
    }
    this.dataSource = new MatTableDataSource<ServiceApplicationModel>(this.serviceApplicationList);
    this.loading = false;
    console.log(this.serviceApplicationList);
    // this.dataSource.paginator = this.paginator;
  }

  checkInvestor() {
    // console.log(this.accountService.currentUser.Tin);
    if (this.accountService.currentUser.Tin !== null) {
      this.getInvestorsByUserId();

    } else {
      this.getInvestorsByUserId();
    }
  }

  getInvestorsByUserId() {
    // if (!this.canViewInvestors) {
    //     this.router.navigate(['denied']);
    // }
    console.log(this.accountService.currentUser.Id);
    this.invService.getInvestorByUserId(this.accountService.currentUser.Id)
      .subscribe(result => {
          console.log(result);
          this.investors = result;
          console.log(result);
          if (this.investors.length === 0) {
            this.router.navigate(['investor-tab/1235/', 0]);
            localStorage.setItem('ServiceId', '1235');
            this.toastr.success('Dear customer Please complete your Profile', 'Well Come !!!', {
              closeButton: true,
            });
          } else {
            localStorage.setItem('InvestorId', this.investors[0].InvestorId.toString());
            localStorage.setItem('InvestorId', this.investors[0].InvestorId.toString());
            this.getServiceApplication();

          }
        },
        error => {
          this.toastr.error(`Error: "${Utilities.getHttpResponseMessage(error)}"`);
        });
  }

  getInvestorsByTin() {
    // if (!this.canViewInvestors) {
    //     this.router.navigate(['denied']);
    // }

    this.invService.getInvestorByUserId(this.accountService.currentUser.Tin)
      .subscribe(result => {
          console.log(result);
          this.investors = result;
          console.log(result);
          if (!this.investors) {
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            localStorage.setItem('InvestorId', this.investors[0].InvestorId.toString());
          }
        },
        error => {
          this.toastr.error(`Error: "${Utilities.getHttpResponseMessage(error)}"`);
        });
  }

  viewNotificationDetail() {
    this.router.navigate(['appointment']);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }

  get canManageTask() {
    return this.accountService.userHasPermission(Permission.manageTasks);
  }

  checkAuthorization() {
    if (this.canManageTask) {
      // this.alertService.error('You are not allowed to access this page');
      this.router.navigate(['denied']);
    }
  }
}

