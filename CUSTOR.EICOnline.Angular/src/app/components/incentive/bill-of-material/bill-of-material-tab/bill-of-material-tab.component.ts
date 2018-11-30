import {Component, OnInit} from '@angular/core';
import {NotificationComponent} from '../../../project-profile/notification/notification.component';
import {MatDialog} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {ServiceapplicationService} from '../../../setting/services-tabs/serviceApplication/serviceapplication.service';
import {AccountService} from '@custor/services/security/account.service';

@Component({
  selector: 'app-bill-of-material-tab',
  templateUrl: './bill-of-material-tab.component.html',
  styleUrls: ['./bill-of-material-tab.component.scss']
})
export class BillOfMaterialTabComponent implements OnInit {

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
  }

  addMessage() {
    this.dialog.open(NotificationComponent);

  }


}
