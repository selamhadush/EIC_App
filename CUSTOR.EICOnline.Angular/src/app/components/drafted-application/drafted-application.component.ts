import {Component, OnInit, ViewChild} from '@angular/core';
import {DataSharingService} from '../../Services/data-sharing.service';
import {FormService} from '@custor/validation/custom/form';
import {ProjectProfileService} from '../../Services/project-profile.service';
import {AccountService} from '@custor/services/security/account.service';
import {ServiceService} from '../../Services/service.service';
import {ServiceapplicationService} from '../setting/services-tabs/serviceApplication/serviceapplication.service';
import {ErrorMessage} from '@custor/services/errMessageService';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../Services/notification.service';
import {FormBuilder} from '@angular/forms';
import {ServiceApplicationModel} from '../../model/ServiceApplication.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-drafted-application',
  templateUrl: './drafted-application.component.html',
  styleUrls: ['./drafted-application.component.scss']
})
export class DraftedApplicationComponent implements OnInit {


  displayedColumns = [
    'No', 'ServiceName', 'ProjectName', 'NextStep', 'currentStatus', 'Action'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<ServiceApplicationModel>;
  public loading = false;
  private serviceApplicationList: ServiceApplicationModel[];

  constructor(private projectProfileService: ProjectProfileService,
              private errMsg: ErrorMessage,
              private router: Router,
              private dataSharing: DataSharingService,
              private route: ActivatedRoute,
              private accountService: AccountService,
              private service: ServiceService,
              private formBuilder: FormBuilder,
              private formService: FormService,
              private notifificationService: NotificationService,
              private serviceApplication: ServiceapplicationService) {
  }

  ngOnInit() {
    this.getServiceApplication();
    // this.getAllProject();
  }


  getServiceApplication() {
    this.serviceApplication.getServiceApplicationsByInvestorId(localStorage.getItem('InvestorId'))
      .subscribe(result => {
        this.loading = false;
        this.filterData(result);
      }, error => this.errMsg.getError(error));
  }

  filterData(serviceApplication: ServiceApplicationModel[]) {
    this.serviceApplicationList = [];
    for (let i = 0; i < serviceApplication.length; i++) {
      if (serviceApplication[i].IsActive === false) {
        this.serviceApplicationList.push(serviceApplication[i]);
        console.log(serviceApplication[i]);
      }
    }
    this.dataSource = new MatTableDataSource<ServiceApplicationModel>(this.serviceApplicationList);
    this.dataSource.paginator = this.paginator;


  }

  nextStep(step: number, projectId: number, serviceApplicationId: any) {
    let stepIndex;

    switch (step) {
      case 8:
        stepIndex = 1;
        break;
      case 9:
        stepIndex = 3;
        break;
      case 10:
        stepIndex = 4;
        break;
      case 11:
        stepIndex = 2;
        break;
      case 12:
        stepIndex = 6;
        break;
      case 13:
        stepIndex = 2;
        break;
      case 14:
        stepIndex = 5;
        break;
      case 18:
        stepIndex = 7;
        break;
    }
    console.log(stepIndex);
    localStorage.setItem('ServiceApplicationId', serviceApplicationId);
    setTimeout(() => this.dataSharing.steeperIndex.next(stepIndex), 0);
    this.router.navigate(['pro/', projectId]);
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
    this.dataSharing.steeperIndex.next(10);

  }

  projectDetail(id: number) {
    console.log(this.router.url);
    this.router.navigate(['/service-detail', id]);
    // this.router.navigate(['../detail'], {relativeTo: this.route});
  }

}
