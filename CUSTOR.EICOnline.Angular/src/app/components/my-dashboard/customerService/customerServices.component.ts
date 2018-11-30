import {Component, OnInit} from '@angular/core';
import {ServiceModel} from '../../../model/Service.model';
import {CustomerServicesService} from '../../home/customer-service.service';
import {ToastrService} from 'ngx-toastr';
import {fadeInOut} from '../../../../@custor/services/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ServiceService} from '../../../Services/service.service';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {IncentiveLogService} from '../../../Services/incentive-log.service';
import {IncentiveLogModel} from '../../../model/IncentiveLog.model';
import {AccountService} from '@custor/services/security/account.service';
import {ProjectListModalComponent} from '../../project-list-modal/project-list-modal.component';

@Component({
  selector: 'app-customer-service-list',
  templateUrl: './customerServices.component.html',
  styleUrls: ['./customerServices.component.scss'],
  animations: [fadeInOut]
})
export class CustomerServiceStarterComponent implements OnInit {
  selectedCustomerService: ServiceModel;
  customerServices: ServiceModel[];
  m: IncentiveLogModel;
  loadingIndicator: boolean;
  public inId: number;

  // public hasInvestorDetail: boolean;

  constructor(private custService: CustomerServicesService,
              public router: Router,
              public dialog: MatDialog,
              public dataSharing: DataSharingService,
              public serviceService: ServiceService,
              public accountService: AccountService,
              public snackbar: MatSnackBar,
              public route: ActivatedRoute,
              private toastr: ToastrService,
              private incentiveLogService: IncentiveLogService) {
    this.m = new IncentiveLogModel();
  }

  ngOnInit() {
    this.getServices();
    // this.hasInvestorDetail = localStorage.getItem('InvestorId') !== null ? true : false;
  }

  getServices() {
    this.serviceService.getAll()
      .subscribe(result => {
        this.customerServices = result;
        console.log(result);
      });
  }

  // getServices() {
  //   this.loadingIndicator = true;
  //   this.custService.getServices2()
  //     .subscribe(result => {
  //         this.customerServices = result;
  //       },
  //       error => {
  //         this.toastr.error(`Error: "${Utilities.getHttpResponseMessage(error)}"`);
  //       });
  //   this.loadingIndicator = false;
  // }

  public startService(serviceId: any, title: string) {
    if (localStorage.getItem('InvestorId') !== null) {
      localStorage.setItem('ServiceId', serviceId);
      localStorage.setItem('title', title);
      localStorage.removeItem('ServiceApplicationId');
      localStorage.removeItem('ProjectId');
      localStorage.removeItem('ParentProjectId');

      setTimeout(() => this.dataSharing.currentIndex.next(0), 0);

      localStorage.setItem('currentIndex', '0');
      // this.router.navigate(['/service-info', serviceId]);

      // this.openDialog();
      const ch = +localStorage.getItem('ServiceId');
      // this.dialogRef.close();

      switch (serviceId) {
        case 13:
          this.router.navigate(['/pro', 0]);
          break;
        case 18:
          this.router.navigate(['/project-renewal', 0]);
          break;
        case 19:
          this.router.navigate(['/project-cancellation', 0]);
          break;
        // case 1023:
        //   this.router.navigate(['/pro', 0], {relativeTo: this.route});
        //   break;
        case 1027:
          this.router.navigate(['/project-substitute', 0], {relativeTo: this.route});
          break;
        case 1028:
          this.router.navigate(['/pro', 0], {relativeTo: this.route});
          break;
        case 1045:
        case 1054:
        case 1046:
        case 1047:
        case 1023:
        case 1236:

          this.router.navigate(['/investor-project-list'], {relativeTo: this.route});
          break;
        default:
          this.router.navigate(['/notfound'], {relativeTo: this.route});
          break;

      }
      this.dialog.closeAll();

    } else {
      this.notification('Your Profile Must be completed');
      this.router.navigate(['/investor-tab']);
    }
  }

  notification(message: string) {
    // this.loading = false;
    this.snackbar.open(`  ${message} .!`, 'Close', {
      duration: 3000,
    });
  }


  selectProject(serviceId: any) {
    this.dialog.open(ProjectListModalComponent);
    // this.IncentiveRouting(serviceId);

  }

  // private IncentiveRouting() {
  //   const InvestorId = localStorage.getItem('InvestorId');
  //   const serviceId = localStorage.getItem('ServiceId');
  //   const ProjectId = localStorage.getItem('ProjectId');
  //   this.m.InvestorId = InvestorId;
  //   this.m.UserId = this.accountService.currentUser.Id;
  //   this.m.SiteId = this.accountService.currentUser.SiteCode;
  //   this.m.ServiceId = serviceId;
  //   this.m.ProjectId = ProjectId;
  //   this.incentiveLogService.create(this.m)
  //     .subscribe(result => {
  //       this.inId = result.IncentiveLogId;
  //       this.toastr.success('Incentive Request Sent');
  //       window.location.href = 'http://localhost:37072/pages/BillOfMaterialRequest.aspx?InsentiveLog=' + this.inId;
  //
  //     });
  // }

  close() {
    // this.dialog.closeAll();
    window.history.back();
  }

}
