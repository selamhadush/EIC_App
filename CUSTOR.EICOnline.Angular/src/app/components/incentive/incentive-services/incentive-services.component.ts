import {Component, OnInit} from '@angular/core';
import {CustomerServicesService} from '../../home/customer-service.service';
import {ServiceModel} from '../../../model/Service.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-incentive-services',
  templateUrl: './incentive-services.component.html',
  styleUrls: ['./incentive-services.component.scss']
})
export class IncentiveServicesComponent implements OnInit {
  public incentiveServiceList: ServiceModel[];
  private title: any;

  constructor(private incentiveService: CustomerServicesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllIncentiveServiceList();
  }

  getAllIncentiveServiceList() {
    this.incentiveService.getIncentiveServices()
      .subscribe(result => {
        this.incentiveServiceList = result;
      });
  }

  view(serviceId: any, name: any) {
    this.title = name;

    switch (serviceId) {
      case 1047:
        this.router.navigate(['bill-of-material/1', 0]);
        break;
      case 1054:
        this.router.navigate(['bill-of-material/2', 0]);
        break;

      case 1046:
        this.router.navigate(['incentive-request-item/', 0]);
        break;
      case 1045:
        this.router.navigate(['tax-exemption/', 0]);
        break;

      default:
        this.router.navigate(['incentive-services']);
        break;
    }
  }

  back() {
    window.history.back();
  }
}
