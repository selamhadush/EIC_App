import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { ServiceStepModel } from '../../../../../model/ServiceStep.model';
import { AngConfirmDialogComponent } from '../../../../../../@custor/components/confirm-dialog/confirm-dialog.component';
import { ServicestepperService } from '../servicestepper.service';
import { ErrorMessage } from '../../../../../../@custor/services/errMessageService';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilities } from '../../../../../../@custor/helpers/utilities';

@Component({
  selector: 'app-list-servicestepper',
  templateUrl: './list-servicestepper.component.html',
  styleUrls: ['./list-servicestepper.component.scss']
})
export class ListServicestepperComponent implements OnInit, AfterViewInit {
  ServiceId: number;
  servicestepmodels: ServiceStepModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['ServiceName', 'Name', 'NameEnglish', 'IsActive', 'actions'];

  dataSource: MatTableDataSource<ServiceStepModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
    private serviceStepperService: ServicestepperService,
    private errMsg: ErrorMessage,
    private toastr: ToastrService, public dialog: MatDialog,
    private router: Router, private route: ActivatedRoute) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getServiceStepModels();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getServiceStepModels() {
    this.loadingIndicator = true;
    this.serviceStepperService.getServiceSteps()
      .subscribe(result => {
        this.servicestepmodels = result;
        if (!this.servicestepmodels) {
          this.toastr.error('No records were found to list', 'Error', {
            closeButton: true,
          });
        } else {
          this.dataSource.data = this.servicestepmodels;
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

  editServiceStep(serviceStepper: ServiceStepModel) {
    if (serviceStepper) {
      this.router.navigate(['/servicesteppers/edit', serviceStepper.ServiceStepId], { relativeTo: this.route });
    } else {
      this.router.navigate(['/servicesteppers/edit', 0]);
    }
  }

  confirmDelete(serviceStepper: ServiceStepModel) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.serviceStepperService.deleteServiceStep(serviceStepper)
          .subscribe(results => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(item => item !== serviceStepper);
          },
            error => {
              // tslint:disable-next-line:max-line-length
              this.toastr.error(
                `An error occured whilst deleting the ServiceStepModel.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                'Delete Error');
            });
      }
      this.loadingIndicator = false;
    });
  }
}