import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NotificationComponent} from '../project-profile/notification/notification.component';
import {DataSharingService} from '../../Services/data-sharing.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-officer-stepper',
  templateUrl: './officer-stepper.component.html',
  styleUrls: ['./officer-stepper.component.scss']
})
export class OfficerStepperComponent implements OnInit {
  public subscription: Subscription;
  public renewalIndex: any;

// Standard tabs demo
  constructor(public dialog: MatDialog,
              private dataSharing: DataSharingService) {
  }

  ngOnInit() {
    this.subscription = this.dataSharing.renewalIndex
      .subscribe(index => {
        this.renewalIndex = index;
        // console.log(index)
        // this.move(this.steeperIndex);
      });
  }

  addMessage() {
    this.dialog.open(NotificationComponent);

  }
}
