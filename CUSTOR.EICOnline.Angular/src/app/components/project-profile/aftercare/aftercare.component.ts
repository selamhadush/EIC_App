import {Component, OnInit, ViewChild} from '@angular/core';
import {ServicestepperService} from '../../setting/services-tabs/servicestepper/servicestepper.service';
import {ServiceStepModel} from '../../../model/ServiceStep.model';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectModel} from '../../../model/project.model';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {ErrorMessage} from '@custor/services/errMessageService';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {BaseComponent} from '../../base-components/base.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-aftercare',
  templateUrl: './aftercare.component.html',
  styleUrls: ['./aftercare.component.scss']
})
export class AftercareComponent extends BaseComponent implements OnInit {
  serviceSteps: ServiceStepModel[];
  loading = true;
  projectList: ProjectModel[];
  dataSource: any;
  step = 0;

  displayedColumns = ['No', 'ProjectName', 'Status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public title: any;
  public projectName: string | null;
  public investorName: string | null;

  constructor(public servicestepperService: ServicestepperService,
              public router: Router,
              public route: ActivatedRoute,
              public errMsg: ErrorMessage,
              public alert: ToastrService,
              public projectProfileService: ProjectProfileService,
              public dataSharing: DataSharingService) {
    super();
  }

  ngOnInit() {
    this.getSteps();
    this.getAllProject();
    this.title = localStorage.getItem('title');
    this.projectName = localStorage.getItem('projectName');
    this.investorName = localStorage.getItem('investorName');
  }

  getSteps() {
    this.servicestepperService.getServiceSteps()
      .subscribe(result => {
        console.log(result);
        this.serviceSteps = result;
      });
  }

  gotStep() {
    this.step = +localStorage.getItem('afterCareStep');
    if (this.step === 0) {
      this.alert.error('select One of them You want To Update');
    } else {
      let stepIndex;
      switch (this.step) {
        case 8:
          stepIndex = 1;
          setTimeout(() => this.dataSharing.steeperIndex.next(stepIndex), 0);
          this.router.navigate(['/pro', 0]);
          break;
        case 9:
          stepIndex = 3;
          this.router.navigate(['/project-cost', 0]);

          break;
        case 10:
          stepIndex = 4;
          this.router.navigate(['/employment', 0]);

          break;
        case 11:
          stepIndex = 2;
          setTimeout(() => this.dataSharing.steeperIndex.next(stepIndex), 0);
          this.router.navigate(['/pro', 0]);
          break;
        case 12:
          stepIndex = 6;
          this.router.navigate(['/product', 0]);

          break;
        case 13:
          stepIndex = 3;
          setTimeout(() => this.dataSharing.steeperIndex.next(stepIndex), 0);
          this.router.navigate(['/pro', 0]);
          break;
        case 14:
          stepIndex = 5;
          this.router.navigate(['/share', 0]);

          break;
        case 18:
          stepIndex = 7;
          setTimeout(() => this.dataSharing.steeperIndex.next(stepIndex), 0);
          this.router.navigate(['/pro', 0]);
          break;
      }

    }
  }

  getAllProject() {
    this.projectProfileService.getAll()
      .subscribe((result: ProjectModel[]) => {
        this.dataSource = new MatTableDataSource<ProjectModel>(result);
        this.loading = false;
        this.projectList = result;
        this.dataSource.paginator = this.paginator;
      }, error => this.errMsg.getError(error));
  }

  view(name: any, step: any) {
    this.title = name;

    localStorage.setItem('afterCareStep', step);
    switch (name) {
      case 'Project cost':
        this.router.navigate(['cost-list'], {relativeTo: this.route});
        break;
      case 'Project Employment':
        this.router.navigate(['employment'], {relativeTo: this.route});
        break;
      case 'project Utility':
        this.router.navigate(['utility'], {relativeTo: this.route});
        break;
      case 'Project OutPut':
        this.router.navigate(['product'], {relativeTo: this.route});
        break;
      case 'Projec Input':
        this.router.navigate(['raw-material'], {relativeTo: this.route});
        break;

      case 'Project Share':
        this.router.navigate(['share'], {relativeTo: this.route});
        break;

      case 'projectStatus':
        this.router.navigate(['project-status'], {relativeTo: this.route});
        break;
      case 'ProjectAddress':
        this.router.navigate(['address/', localStorage.getItem('ProjectId')]);

        break;
      default:
        this.router.navigate(['notfound']);
        break;
    }

    // this.router.navigate(['employment'], {relativeTo: this.route});
  }

  back() {
    window.history.back();
  }
}
