import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { ToastrService } from 'ngx-toastr';
import { ServicePrerequisiteModel } from '../../../../../model/service';
import { AngConfirmDialogComponent } from '../../../../../../@custor/components/confirm-dialog/confirm-dialog.component';
import { ErrorMessage } from '../../../../../../@custor/services/errMessageService';
import { Utilities } from '../../../../../../@custor/helpers/utilities';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ServicesService]
})
export class ListComponent implements OnInit, AfterViewInit {
  ServiceId: number;
  servicePrerequisiteModels: ServicePrerequisiteModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['ServiceId', 'DisplayName', 'DisplayNameEnglish', 'IsActive', 'actions'];

  dataSource: MatTableDataSource<ServicePrerequisiteModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
    private servicesService: ServicesService,
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
    this.getServices();
  }
  getServices() {
    this.loadingIndicator = true;
    this.servicesService.getServices()
      .subscribe(result => {
        this.servicePrerequisiteModels = result;
        if (!this.servicePrerequisiteModels) {
          this.toastr.error('No records were found to list', 'Error', {
            closeButton: true,
          });
        } else {
          this.dataSource.data = this.servicePrerequisiteModels;
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
  editService(servicePrerequisiteModel: ServicePrerequisiteModel) {
    if (servicePrerequisiteModel) {
      // const dialogRef = this.dialog.open(EditComponent,
      //   {
      //     panelClass: 'mat-dialog-lg',
      //     data: { servicePrerequisiteModel: servicePrerequisiteModel, roles: [] }
      //   });
      this.router.navigate(['/services-tab/edit', servicePrerequisiteModel.ServiceId], { relativeTo: this.route });
    } else {
      this.router.navigate(['/services-tab/edit', 0]);
    }
  }

  confirmDelete(servicePrerequisiteModel: ServicePrerequisiteModel) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.servicesService.deleteService(servicePrerequisiteModel)
          .subscribe(results => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(item => item !== servicePrerequisiteModel);
          },
            error => {
              // tslint:disable-next-line:max-line-length
              this.toastr.error(
                `An error occured whilst deleting the Service.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                'Delete Error');
            });
      }
      this.loadingIndicator = false;
    });
  }
}