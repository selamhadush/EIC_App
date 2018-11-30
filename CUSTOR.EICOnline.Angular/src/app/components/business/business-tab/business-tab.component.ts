import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {AccountService} from "@custor/services/security/account.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {DataSharingService} from "../../../Services/data-sharing.service";
import {NotificationComponent} from "../../project-profile/notification/notification.component";

@Component({
  selector: 'app-business-tab',
  templateUrl: './business-tab.component.html',
  styleUrls: ['./business-tab.component.scss']
})
export class BusinessTabComponent implements OnInit {


  public selectedIndex = 0;
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

