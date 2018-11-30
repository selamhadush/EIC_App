import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TariffService} from '../tariff.service';
import {TariffModel} from '../../../../../model/tariff';
import {ToastrService} from 'ngx-toastr';

import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AngConfirmDialogComponent} from '../../../../../../@custor/components/confirm-dialog/confirm-dialog.component';
import {ErrorMessage} from '../../../../../../@custor/services/errMessageService';
import {Utilities} from '../../../../../../@custor/helpers/utilities';

@Component({
  selector: 'app-list-tariff',
  templateUrl: './list-tariff.component.html',
  styleUrls: ['./list-tariff.component.css'],
  providers: [TariffService]
})
export class ListTariffComponent implements OnInit, AfterViewInit {
  ServiceId: number;
  tariffs: TariffModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['AccountCode', 'Name', 'NameEnglish', 'Fee', 'actions'];

  dataSource: MatTableDataSource<TariffModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
              private tariffService: TariffService,
              private errMsg: ErrorMessage,
              private toastr: ToastrService, public dialog: MatDialog,
              private router: Router, private route: ActivatedRoute) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getTariffs();
  }

  getTariffs() {
    this.loadingIndicator = true;
    this.tariffService.getTariffs()
      .subscribe(result => {
          this.tariffs = result;
          if (!this.tariffs) {
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            this.dataSource.data = this.tariffs;
          }
        },
        err => {
          if (!this.errMsg.message) {
            this.toastr.error('Error! Please check if the Web tariff is running');
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

  editTariff(tariff: TariffModel) {
    if (tariff) {
      this.router.navigate(['/tariffs/edit', tariff.TariffId], {relativeTo: this.route});
    } else {
      this.router.navigate(['/tariffs/edit', 0]);
    }
  }

  confirmDelete(tariff: TariffModel) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.tariffService.deleteTariff(tariff)
          .subscribe(results => {
              this.loadingIndicator = false;
              this.dataSource.data = this.dataSource.data.filter(item => item !== tariff);
            },
            error => {
              // tslint:disable-next-line:max-line-length
              this.toastr.error(
                `An error occured whilst deleting the tariff.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                'Delete Error');
            });
      }
      this.loadingIndicator = false;
    });
  }
}