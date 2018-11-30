import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {SubSectorModel} from '../../../../../model/subSector';
import {ActivityModel} from '../../../../../model/activity';
import {ToastrService} from 'ngx-toastr';
import {ActivityService} from '../activity.service';
import {AngConfirmDialogComponent} from '../../../../../../@custor/components/confirm-dialog/confirm-dialog.component';
import {Utilities} from '../../../../../../@custor/helpers/utilities';
import {ErrorMessage} from '../../../../../../@custor/services/errMessageService';

@Component({
  selector: 'app-list',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent implements OnInit, AfterViewInit {
  subSectorModels: SubSectorModel[];
  activityModels: ActivityModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Id', 'SubSector', 'Description', 'DescriptionEnglish', 'actions'];

  dataSource: MatTableDataSource<ActivityModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
              private subActivityService: ActivityService,
              private errMsg: ErrorMessage,
              private toastr: ToastrService, public dialog: MatDialog,
              private router: Router, private route: ActivatedRoute) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.getActivitys();
  }

  getActivitys() {
    this.loadingIndicator = true;
    this.subActivityService.getActivitys()
      .subscribe(result => {
          this.activityModels = result;
          if (!this.activityModels) {
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            this.dataSource.data = this.activityModels;
          }
        },
        err => {
          if (!this.errMsg.message) {
            this.toastr.error('Error! Please check if the Web serviceprerequistie is running');
          } else {
            this.toastr.error(this.errMsg.getError(err));
          }
        });
    this.loadingIndicator = false;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editActivity(activityModel?: ActivityModel) {
    if (activityModel) {
      this.router.navigate(['/activitys/edit', activityModel.ActivityId], {relativeTo: this.route});
    } else {
      this.router.navigate(['/activitys/edit', 0]);
    }
  }

  confirmDelete(activityModel: ActivityModel) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.subActivityService.deleteAcitivity(activityModel)
          .subscribe(results => {
              this.loadingIndicator = false;
              this.dataSource.data = this.dataSource.data.filter(item => item !== activityModel);
            },
            error => {
              // tslint:disable-next-line:max-line-length
              this.toastr.error(
                `An error occured whilst deleting the activity.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                'Delete Error');
            });
      }
      this.loadingIndicator = false;
    });
  }
}
