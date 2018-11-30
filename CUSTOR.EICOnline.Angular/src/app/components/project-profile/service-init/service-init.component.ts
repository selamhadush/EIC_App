import {Component, OnInit} from '@angular/core';
import {UserActivityDataServices} from '../../../admin/user-detail/user-detail.service';
import {ServicePrerequisiteService} from '../../setting/services-tabs/serviceprerequistie/servicePrerequisite.service';
import {ServicePrerequisite} from '../../../model/service-prerequisite';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-service-init',
  templateUrl: './service-init.component.html',
  styleUrls: ['./service-init.component.scss']
})
export class ServiceInitComponent implements OnInit {
  public servicePrerequisite: ServicePrerequisite[];

  constructor(public servicePrerequisiteService: ServicePrerequisiteService,
              public route: ActivatedRoute,
              public router: Router,
              private dialogRef: MatDialogRef<ServiceInitComponent>,
              public activityDataServices: UserActivityDataServices) {
  }

  ngOnInit() {
    this.getServicePrerequisite(localStorage.getItem('ServiceId'));
    console.log(localStorage.getItem('ServiceId'));
  }

  getServicePrerequisite(ServiceId: any) {
    this.servicePrerequisiteService.servicePrerequisiteByServiceId(ServiceId)
      .subscribe(result => {
        this.servicePrerequisite = result;
      });
  }

  continue() {
    const ch = +localStorage.getItem('ServiceId');
    // this.dialogRef.close();

    switch (ch) {
      case 13:
        this.router.navigate(['/pro', 0]);

        break;
      case 18:
        this.router.navigate(['/project-renewal', 0]);
        break;
      case 19:
        this.router.navigate(['/project-cancellation', 0], {relativeTo: this.route});
        break;
      case 1023:
        this.router.navigate(['/pro', 0], {relativeTo: this.route});
        break;
      default:
        this.router.navigate(['/notfound'], {relativeTo: this.route});
        break;
    }
  }

  close() {
    this.dialogRef.close();
  }
}
