import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServicePrerequisite } from '../../../../../model/service-prerequisite';
import { ServicePrerequisiteService } from '../servicePrerequisite.service';
import { ToastrService } from 'ngx-toastr';
import { AngConfirmDialogComponent } from '../../../../../../@custor/components/confirm-dialog/confirm-dialog.component';
import { ErrorMessage } from '../../../../../../@custor/services/errMessageService';
import { Utilities } from '../../../../../../@custor/helpers/utilities';

@Component({
  selector: 'app-serviceprerequiste-list',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css'],
  providers: [ServicePrerequisiteService]
})
export class ListServiceComponent implements OnInit, AfterViewInit {
  ServiceId: number;
  serviceprerequisites: ServicePrerequisite[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Service Name', 'Description', 'DescriptionEnglish', 'IsActive', 'actions'];

  dataSource: MatTableDataSource<ServicePrerequisite>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
    private servicePrerequisiteService: ServicePrerequisiteService,
    private errMsg: ErrorMessage,
    private toastr: ToastrService, public dialog: MatDialog,
    private router: Router, private route: ActivatedRoute) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getServicePrerequisites();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getServicePrerequisites() {
    this.loadingIndicator = true;
    this.servicePrerequisiteService.getServicePrerequisites()
      .subscribe(result => {
        this.serviceprerequisites = result;
        if (!this.serviceprerequisites) {
          this.toastr.error('No records were found to list', 'Error', {
            closeButton: true,
          });
        } else {
          this.dataSource.data = this.serviceprerequisites;
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

  editServicePrerequisite(servicePrerequisite: ServicePrerequisite) {
    if (servicePrerequisite) {
      this.router.navigate(['/serviceprerequisites/edit', servicePrerequisite.ServicePrerequisiteId], { relativeTo: this.route });
    } else {
      this.router.navigate(['/serviceprerequisites/edit', 0]);
    }
  }

  confirmDelete(servicePrerequisite: ServicePrerequisite) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.servicePrerequisiteService.deleteServicePrerequisite(servicePrerequisite)
          .subscribe(results => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(item => item !== servicePrerequisite);
          },
            error => {
              // tslint:disable-next-line:max-line-length
              this.toastr.error(
                `An error occured whilst deleting the ServicePrerequisite.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                'Delete Error');
            });
      }
      this.loadingIndicator = false;
    });
  }
}