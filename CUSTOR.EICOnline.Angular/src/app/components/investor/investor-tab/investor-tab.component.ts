import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {Subscription} from 'rxjs';
import {AccountService} from '@custor/services/security/account.service';
import {Router} from '@angular/router';
import {NotificationComponent} from "../../project-profile/notification/notification.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-investor-tab',
  templateUrl: './investor-tab.component.html',
  styleUrls: ['./investor-tab.component.scss']
})
export class InvestorTabComponent implements OnInit {
  public isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  public selectedIndex = 0;
  private subscription: Subscription;
  public title: string;
  public projectName: string;
  public investorName: string;
  public isInvestor: boolean;
  public userName: string;

  constructor(private accountService: AccountService,
              public router: Router,
              public dialog: MatDialog,
              public dataSharing: DataSharingService) {
  }

  ngOnInit() {

    this.getUserType();

    this.title = localStorage.getItem('title');
    this.projectName = localStorage.getItem('projectName');
    this.investorName = localStorage.getItem('investorName');
    this.userName = this.accountService.currentUser.FullName;
  }

  getUserType() {
    this.isInvestor = this.accountService.getUserType();
  }

  addMessage() {
    this.dialog.open(NotificationComponent);

  }
}

