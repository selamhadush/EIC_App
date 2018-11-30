import {Component, OnInit} from '@angular/core';
import {NotificationComponent} from '../../../project-profile/notification/notification.component';
import {ToastrService} from 'ngx-toastr';
import {ServiceapplicationService} from '../../../setting/services-tabs/serviceApplication/serviceapplication.service';
import {AccountService} from '@custor/services/security/account.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-tax-exemption-tab',
  templateUrl: './tax-exemption-tab.component.html',
  styleUrls: ['./tax-exemption-tab.component.scss']
})
export class TaxExemptionTabComponent implements OnInit {
  public isInvestor: boolean;

  constructor(private serviceApplicationsServices: ServiceapplicationService,
              public accountService: AccountService,
              private dialog: MatDialog,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getUserType();
  }

  UpdateServiceApplication() {
    this.serviceApplicationsServices.finalForApprovalServiceApplications(
      localStorage.getItem('ServiceApplicationId'))
      .subscribe(result => {
        console.log(result);
        this.toastr.success('Application submitted successfully we will revise soon as well as  we will notify for any action required');
      });
  }

  getUserType() {
    this.isInvestor = this.accountService.getUserType();
    console.log(this.isInvestor);
  }

  addMessage() {
    this.dialog.open(NotificationComponent);

  }
}
