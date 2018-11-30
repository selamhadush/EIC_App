import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AccountService} from '@custor/services/security/account.service';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {NotificationComponent} from '../notification/notification.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-project-cancellation-tab',
  templateUrl: './project-cancellation-tab.component.html',
  styleUrls: ['./project-cancellation-tab.component.scss']
})
export class ProjectCancellationTabComponent implements OnInit {

  public isInvestor: boolean;
  public title: string | null;
  private subscription: Subscription;
  public renewalIndex: any;
  public projectName: string | null;
  public investorName: string | null;

  constructor(public accountService: AccountService,
              public dialog: MatDialog,
              private dataSharing: DataSharingService) {

  }

  ngOnInit() {
    this.getUserType();
    this.subscription = this.dataSharing.renewalIndex
      .subscribe(index => {
        this.renewalIndex = index;
        // console.log(index)
        // this.move(this.steeperIndex);
      });
    this.title = localStorage.getItem('title');
    this.projectName = localStorage.getItem('projectName');
    this.investorName = localStorage.getItem('investorName');
  }

  getUserType() {
    this.isInvestor = this.accountService.getUserType();
  }

  addMessage() {
    this.dialog.open(NotificationComponent);

  }
}
