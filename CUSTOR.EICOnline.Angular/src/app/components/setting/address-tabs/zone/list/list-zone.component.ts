import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Zone} from '../../../../../model/address';
import {ToastrService} from 'ngx-toastr';
import {ZoneService} from '../zone.service';
import {AngConfirmDialogComponent} from '../../../../../../@custor/components/confirm-dialog/confirm-dialog.component';
import {ErrorMessage} from '../../../../../../@custor/services/errMessageService';
import {Utilities} from '../../../../../../@custor/helpers/utilities';

@Component({
  selector: 'app-list-zone',
  templateUrl: './list-zone.component.html',
  styleUrls: ['./list-zone.component.css']
})
export class ListZoneComponent implements OnInit, AfterViewInit {
  zoneModels: Zone[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Id',  'Description', 'DescriptionEnglish', 'actions'];

  dataSource: MatTableDataSource<Zone>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
              private subZoneService: ZoneService,
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
    this.getZones();
  }

  getZones() {
    this.loadingIndicator = true;
    this.subZoneService.getZones()
      .subscribe(result => {
          this.zoneModels = result;
          if (!this.zoneModels) {
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            // console.log(this.zoneModels);
            this.dataSource.data = this.zoneModels;
          }
        },
        err => {
          if (!this.errMsg.message) {
            this.toastr.error('Error! Please check if the Web zone is running');
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

  editZone(zoneModel: Zone) {
    if (zoneModel) {
      this.router.navigate(['/zones/edit', zoneModel.ZoneId], {relativeTo: this.route});
    } else {
      this.router.navigate(['/zones/edit', 0]);
    }
  }

  confirmDelete(zoneModel: Zone) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.subZoneService.deleteZone(zoneModel)
          .subscribe(results => {
              this.loadingIndicator = false;
              this.dataSource.data = this.dataSource.data.filter(item => item !== zoneModel);
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