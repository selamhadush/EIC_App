import {AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {ServiceService} from '../../../Services/service.service';
import {ServiceModel} from '../../../model/Service.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ErrorMessage} from '@custor/services/errMessageService';
import {FormService} from '@custor/validation/custom/form';
import {AccountService} from '@custor/services/security/account.service';
import {Permission} from '../../../model/security/permission.model';
import {ServiceApplicationModel} from '../../../model/ServiceApplication.model';
import {ServiceapplicationService} from '../../setting/services-tabs/serviceApplication/serviceapplication.service';
import {TaskDispatcherComponent} from '../../task-dispatcher/task-dispatcher.component';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ApplicationStatus} from '@custor/const/consts';
import {ApplicationStatusModel, ProjectStatusModel} from '../../../model/lookupData';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, AfterContentChecked, AfterViewInit {
  // projectList: ProjectModel[];
  dataSource: any;
  subscribtion = new Subscription();
  loading = true;
  searchForm: FormGroup;
  serviceList: ServiceModel[] = [];
  displayedColumns = [
    'ServiceName', 'ProjectName', 'InvestorName', 'currentStatus', 'NextStep', 'Action'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isOfficer = false;
  formErrors: {};
  public serviceApplicationList: ServiceApplicationModel[];
  public assigned: boolean;
  public applicationStatus: ApplicationStatusModel[] = [];

  constructor(private projectProfileService: ProjectProfileService,
              private errMsg: ErrorMessage,
              private router: Router,
              public dialog: MatDialog,
              private serviceApplication: ServiceapplicationService,
              private dataSharing: DataSharingService,
              private route: ActivatedRoute,
              private accountService: AccountService,
              private service: ServiceService,
              private toast: ToastrService,
              private formBuilder: FormBuilder,
              private formService: FormService) {
  }

  ngOnInit() {

    this.formBuild();
    // this.checkAuthorization();
    if (this.canManageTask) {
      this.getAllServiceApplication();
    } else {
      this.getAllServiceApplicationByOfficerId(this.accountService.currentUser.Id);
      this.isOfficer = true;

    }
    this.getAllService();
    this.dataSharing.assignTask.subscribe(result => {
      this.assigned = result;
    });

    // if (!this.canViewTaskDispach) {
    //   this.toast.info('this user  is not view dispache');
    // }
    // setTimeout(() => this.dataSource.paginator = this.paginator);
    this.initStaticData('en');
  }

  deleteProject(id: number) {
    console.log(id);
    const response = confirm('Do you want to Delete this Project ?');
    if (response === true) {
      this.projectProfileService.delete(id)
        .subscribe(() => {
          this.getAllServiceApplication();
        });
      return true;
    } else {
      return false;
    }
  }


  editProject(projectId: number, serviceApplicationId: any, serviceId: any, title: string) {
    localStorage.setItem('ServiceApplicationId', serviceApplicationId);
    localStorage.setItem('ServiceId', serviceId);
    localStorage.setItem('title', title);

    setTimeout(() => this.dataSharing.isNew.next(true), 0);

    switch (serviceId) {
      case 13 || 1023 || 1028:
        // this.router.navigate(['/officer']);
        this.router.navigate(['pro/', projectId]);
        break;
      case 18:
        this.router.navigate(['/project-renewal', serviceApplicationId]);
        break;
      case 19:
        this.router.navigate(['/project-cancellation', serviceApplicationId], {relativeTo: this.route});
        break;

      default:
        this.router.navigate(['/notfound'], {relativeTo: this.route});
        break;
    }
  }

  projectDetail(id: number) {
    console.log(this.router.url);
    this.router.navigate(['/service-detail', id]);
  }

  projectApprove(id: any, serviceId: any, investorId?: any, ProjectId?: any) {

    localStorage.setItem('ServiceApplicationId', id);
    localStorage.setItem('ServiceId', serviceId);
    localStorage.setItem('InvestorId', investorId);
    localStorage.setItem('ProjectId', ProjectId); // Todo Project Id must be removed
    // this.router.navigate(['/project-renewal', 0]);
    console.log(localStorage.getItem('ServiceApplicationId'));

    switch (serviceId) {
      case 13 || 1023:
        this.router.navigate(['/officer']);

        break;
      case 18:
        this.router.navigate(['/project-renewal', id]);
        break;
      case 19:
        this.router.navigate(['/project-cancellation', id], {relativeTo: this.route});
        break;
      case 1027:
        this.router.navigate(['/project-substitute', id], {relativeTo: this.route});
        break;
      case 1045:
        this.router.navigate(['tax-exemption/', id]);
        break;
      case 1046:
        this.router.navigate(['incentive-request-item/', id]);
        break;
      case 1047:
        this.router.navigate(['/bill-of-material/1/', id]);
        break;
      case 1054:
        this.router.navigate(['/bill-of-material/2/', id]);
        break;
      case 1235:
        this.router.navigate(['investor-tab/' + serviceId + '/' + id]);
        break;
      case 1236:
        this.router.navigate(['business-tab/' + serviceId + '/' + id]);
        break;
      default:
        this.router.navigate(['/notfound'], {relativeTo: this.route});
        break;
    }
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  onProjectList() {
    console.log(this.router.url);
    this.router.navigate(['../list'], {relativeTo: this.route});
  }

  onNewProject() {
    console.log(this.router.url);
    this.router.navigate(['../new'], {relativeTo: this.route});
  }

  nextStep(step: number, projectId: any, serviceApplicationId: any, serviceId: any, title: string, workFlowId: any, InvestorId: any, investorName: string, projectName: string) {
    console.log(investorName);
    let stepIndex;
    console.log(workFlowId);
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
    localStorage.setItem('ServiceId', serviceId);
    localStorage.setItem('title', title);
    localStorage.setItem('ProjectId', projectId);
    localStorage.setItem('ServiceApplicationId', serviceApplicationId);
    localStorage.setItem('workFlowId', workFlowId);
    localStorage.setItem('InvestorId', InvestorId);
    localStorage.setItem('investorName', investorName);
    localStorage.setItem('projectName', projectName);
    setTimeout(() => this.dataSharing.steeperIndex.next(stepIndex), 0);
    setTimeout(() => this.dataSharing.currentIndex.next(stepIndex), 0);
    this.router.navigate(['pro/', projectId]);
  }

  getAllService() {
    this.service.getAll()
      .subscribe(result => {
        this.serviceList = result;
      });
  }

  formBuild() {
    this.searchForm = this.formBuilder.group({
      ServiceId: [],
      status: [],
      SpecDate: [],
      FromDate: [],
      ToDate: []
    });
    this.searchForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formService.validateForm(this.searchForm, this.formErrors, true);
    });
  }

  getAllServiceApplication() {
    this.dataSharing.assignTask.next(false);
    this.serviceApplication.getServiceAppliactions()
      .subscribe(result => {
        this.dataSource = new MatTableDataSource<ServiceApplicationModel>(result);
        this.loading = false;
        this.dataSource.paginator = this.paginator;

        this.serviceApplicationList = result;

      }, error => this.errMsg.getError(error));
  }

  getAllServiceApplicationByOfficerId(officerId: any) {
    this.dataSharing.assignTask.next(false);
    this.serviceApplication.getServiceApplicationsByOfficerId(officerId)
      .subscribe(result => {
        this.dataSource = new MatTableDataSource<ServiceApplicationModel>(result);
        this.loading = false;
        this.serviceApplicationList = result;
        console.log(result);
        this.dataSource.paginator = this.paginator;

        // console.log(this.serviceApplicationList[0].ServiceWorkflow[0].NextStepId);
        // this.dataSource.paginator = this.paginator;
      }, error => this.errMsg.getError(error));
  }

  search() {
    // this.serviceApplicationList = [];
    this.dataSource = [];
    this.projectProfileService.search(this.searchForm.value)
      .subscribe((result) => {
        console.log(result);
        this.filterData(result);
        this.searchForm.reset();
      }, error => this.errMsg.getError(error));
  }

  filterData(data: any) {
    this.serviceApplicationList = [];
    for (let i = 0; i < data.length; i++) {
      this.serviceApplicationList.push(data[i]);
    }
    this.dataSource = new MatTableDataSource<ServiceApplicationModel>(this.serviceApplicationList);
    this.loading = false;
    console.log(this.serviceApplicationList);
    // this.dataSource.paginator = this.paginator;
  }

  get canManageTask() {
    return this.accountService.userHasPermission(Permission.manageTasks);
  }

  get canManageServiceApplication() {
    return this.accountService.userHasPermission(Permission.manageServiceApplication);
  }

  get canManageManageAftercareData() {
    return this.accountService.userHasPermission(Permission.ManageAftercareDataPermission);
  }

  get canManageDispatchIncentivesServices() {
    return this.accountService.userHasPermission(Permission.DispatchIncentivesServicesPermission);
  }

  get canManageApproveIncentiveUploadedItems() {
    return this.accountService.userHasPermission(Permission.ApproveIncentiveUploadedItemsPermission);
  }

  get canManageManageIncentiveAssignedServices() {
    return this.accountService.userHasPermission(Permission.ManageIncentiveAssignedServicesPermission);
  }

  get canViewReadOnlyData() {
    return this.accountService.userHasPermission(Permission.ViewReadOnlyDataPermission);
  }

  get canViewServiceApplication() {
    return this.accountService.userHasPermission(Permission.viewServiceApplication);
  }

  get canViewTasks() {
    return this.accountService.userHasPermission(Permission.viewServiceList);
  }

  assignUser(serviceApplicationId: any) {
    localStorage.setItem('ServiceApplicationId', serviceApplicationId);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      'top': '106px',
      'right': '230px'

    };
    dialogConfig.minWidth = '800px';
    // dialogConfig.maxHeight = '500px';
    dialogConfig.minHeight = '400px';
    dialogConfig.maxHeight = '400px';
    dialogConfig.panelClass = 'padding:1px;';

    this.dialog.open(TaskDispatcherComponent, dialogConfig);

  }


  initStaticData(currentLang) {


    let applicationStatus1: ProjectStatusModel = new ProjectStatusModel();
    ApplicationStatus.forEach(pair => {
      applicationStatus1 = {
        'Id': pair.Id.toString(), 'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.applicationStatus.push(applicationStatus1);
    });
  }


  // viewDetailTask(taskId: any) {
  //   localStorage.setItem('TodoTaskId', taskId);
  //   const dialogConfig = new MatDialogConfig();
  //
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = false;
  //   dialogConfig.position = {
  //     'top': '106px',
  //     'right': '230px'
  //
  //   };
  //   dialogConfig.minWidth = '800px';
  //   // dialogConfig.maxHeight = '500px';
  //   dialogConfig.minHeight = '400px';
  //   dialogConfig.maxHeight = '400px';
  //   dialogConfig.panelClass = 'padding:1px;';
  //
  //   this.dialog.open(TaskDispatcherComponent, dialogConfig);
  //
  // }
  checkAuthorization() {
    if (!this.canManageTask || !this.canViewTasks) {
      // this.alertService.error('You are not allowed to access this page');
      this.router.navigate(['denied']);
    }
  }

  ngAfterContentChecked(): void {
    if (this.assigned) {
      this.getAllServiceApplication();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }
}
