import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ServicetariffService} from '../servicetariff.service';
import {ToastrService} from 'ngx-toastr';
import {ServicePrerequisiteModel} from '../../../../../model/service';
import {ServiceTariffModel} from '../../../../../model/servicetariff';
import {AngConfirmDialogComponent} from '../../../../../../@custor/components/confirm-dialog/confirm-dialog.component';
import {ErrorMessage} from '../../../../../../@custor/services/errMessageService';

@Component({
  selector: 'app-list-servicetariff',
  templateUrl: './list-servicetariff.component.html',
  styleUrls: ['./list-servicetariff.component.css'],
  providers: [ServicetariffService]
})
export class ListServicetariffComponent implements OnInit, AfterViewInit {
  ServiceId: number;
  serviceTariffModels: ServiceTariffModel[];
  service: ServicePrerequisiteModel[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['ServiceId', 'ServiceNameEnglish', 'actions'];

  dataSource: MatTableDataSource<ServicePrerequisiteModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
              private servicesService: ServicetariffService,
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
    this.getServiceTariffs();
  }

  getServiceTariffs() {
    this.loadingIndicator = true;
    this.servicesService.getService()
      .subscribe(result => {
          console.log(result);
          this.service = result;
          if (!this.service) {
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            this.dataSource.data = this.service;
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

  editServiceTariff(serviceTariffModel: ServiceTariffModel) {
    console.log(serviceTariffModel);
    if (serviceTariffModel) {
      this.router.navigate(['/servicetariffs/edit', serviceTariffModel.ServiceId], {relativeTo: this.route});
    } else {
      this.router.navigate(['/servicetariffs/edit', 0]);
    }
  }

  // confirmDelete(serviceTariffModel: ServiceTariffModel) {
  //   this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
  //     {
  //       disableClose: false
  //     });
  //
  //   this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
  //
  //   this.confirmDialogRef.afterClosed().subscribe(result => {
  //     this.loadingIndicator = true;
  //     if (result) {
  //
  //       this.servicesService.deleteServiceTariff(serviceTariffModel)
  //         .subscribe(results => {
  //
  //             this.loadingIndicator = false;
  //             this.dataSource.data = this.dataSource.data.filter(item => item !== this.serviceTariffModels);
  //           },
  //           error => {
  //
  //             // tslint:disable-next-line:max-line-length
  //             this.toastr.error(
  //               `An error occured whilst deleting the Service.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
  //               'Delete Error');
  //           });
  //     }
  //     this.loadingIndicator = false;
  //   });
  // }
}