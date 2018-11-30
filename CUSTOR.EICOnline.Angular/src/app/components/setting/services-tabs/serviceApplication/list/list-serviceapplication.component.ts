import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AngConfirmDialogComponent} from '@custor/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ErrorMessage} from '@custor/services/errMessageService';
import {ToastrService} from 'ngx-toastr';
import {ServiceApplicationModel} from '../../../../../model/ServiceApplication.model';
import {ServiceapplicationService} from '../serviceapplication.service';

@Component({
  selector: 'app-list-serviceapplication',
  templateUrl: './list-serviceapplication.component.html',
  styleUrls: ['./list-serviceapplication.component.scss']
})
export class ListServiceapplicationComponent implements OnInit, AfterViewInit {
  ServiceId: number;
  serviceApplicationModels: ServiceApplicationModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['ServiceApplicationId', 'ServiceName', 'InvestorName', 'actions'];

  dataSource: MatTableDataSource<ServiceApplicationModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
              private serviceApplicationService: ServiceapplicationService,
              private errMsg: ErrorMessage,
              private toastr: ToastrService, public dialog: MatDialog,
              private router: Router, private route: ActivatedRoute) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getServiceApplications();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getServiceApplications() {
    this.loadingIndicator = true;
    this.serviceApplicationService.getServiceAppliactions()
      .subscribe(result => {
          this.serviceApplicationModels = result;
          console.log(this.serviceApplicationModels);
          if (!this.serviceApplicationModels) {
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            this.dataSource.data = this.serviceApplicationModels;
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

  editServiceApplication(serviceApplication: ServiceApplicationModel) {
    if (serviceApplication) {
      this.router.navigate(['/orders/edit', serviceApplication.ServiceApplicationId], {relativeTo: this.route});
    } else {
      this.router.navigate(['/orders/edit', 0]);
    }
  }
}