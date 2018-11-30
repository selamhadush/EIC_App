import {Component, OnInit} from '@angular/core';
import {ServicePrerequisiteService} from '../../setting/services-tabs/serviceprerequistie/servicePrerequisite.service';
import {ServicePrerequisite} from '../../../model/service-prerequisite';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProjectModel} from '../../../model/project.model';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {DataSharingService} from '../../../Services/data-sharing.service';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.scss']
})
export class ServiceInfoComponent implements OnInit {
  serviceListPre: ServicePrerequisite[];
  projectList: ProjectModel[];
  title: string;
  serviceId: any;
  public serviceDetail: ProjectModel;
  public checkLists: ServicePrerequisite[];

  constructor(public  servicePrerequisiteService: ServicePrerequisiteService,
              public router: Router,
              private dataSharing: DataSharingService,
              public projetServices: ProjectProfileService,
              public route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.title = localStorage.getItem('title');
    this.route.params
      .subscribe((params: Params) => {
        this.serviceId = +params['id'];
        this.serviceId = this.route.snapshot.params['id'];
        if (this.serviceId > 1) {
          this.title = localStorage.getItem('title');
        }
      });
    this.getPrerequisiteByServiceId(localStorage.getItem('ServiceId'));

  }

  getPrerequisiteByServiceId(serviceId: any) {
    this.servicePrerequisiteService.servicePrerequisiteByServiceId(serviceId)
      .subscribe(result => {
        this.checkLists = result;
      });
  }

  continue() {
    const ch = +localStorage.getItem('ServiceId');
    this.dataSharing.renewalIndex.next(1);
    this.dataSharing.steeperIndex.next(1);
  }

  info() {
    const ch = +localStorage.getItem('ServiceId');
    this.router.navigate(['/requirement', ch]);
  }

  back() {
    window.history.back();
  }


}
















































