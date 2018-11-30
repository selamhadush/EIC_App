import {Component, OnInit, ViewChild} from '@angular/core';
import {NotificationModel} from '../../model/Notification.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorMessage} from '@custor/services/errMessageService';
import {NotificationService} from '../../Services/notification.service';
import {FormBuilder} from '@angular/forms';
import {DataSharingService} from '../../Services/data-sharing.service';
import {FormService} from '@custor/validation/custom/form';
import {AccountService} from '@custor/services/security/account.service';
import {ServiceService} from '../../Services/service.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  public dataSourceNotitification: MatTableDataSource<NotificationModel>;
  public loading = false;
  private notitficationList: NotificationModel[];
  @ViewChild(MatPaginator) paginator2: MatPaginator;

  displayedColumnsNotification = [
    'date', 'subject', 'message'
  ];

  constructor(private errMsg: ErrorMessage,
              private router: Router,
              private dataSharing: DataSharingService,
              private route: ActivatedRoute,
              private accountService: AccountService,
              private service: ServiceService,
              private formBuilder: FormBuilder,
              private formService: FormService,
              private notifificationService: NotificationService) {
  }

  ngOnInit() {
    this.getAllNotification(this.accountService.currentUser.Id);
  }

  getAllNotification(investorId: any) {
    this.notifificationService.getAllById(investorId)
      .subscribe(result => {
        this.dataSourceNotitification = new MatTableDataSource<NotificationModel>(result);
        this.loading = false;
        this.notitficationList = result;
        console.log(this.notitficationList);
        this.dataSourceNotitification.paginator = this.paginator2;
      }, error => this.errMsg.getError(error));
  }


}
