import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Region } from '../../../../../model/address';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { RegionService } from '../region.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngConfirmDialogComponent } from '@custor/components/confirm-dialog/confirm-dialog.component';
import { ErrorMessage } from '@custor/services/errMessageService';
import { Utilities } from '@custor/helpers/utilities';

@Component({
  selector: 'app-list-region',
  templateUrl: './list-region.component.html',
  styleUrls: ['./list-region.component.css']
})
export class ListRegionComponent implements OnInit, AfterViewInit {
  regionModels: Region[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['RegionId', 'Description', 'DescriptionEnglish', 'actions'];

  dataSource: MatTableDataSource<Region>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
    private regionService: RegionService,
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
    this.getRegions();
  }

  getRegions() {
    this.loadingIndicator = true;
    this.regionService.getRegions()
      .subscribe(result => {
        this.regionModels = result;
        if (!this.regionModels) {
          this.toastr.error('No records were found to list', 'Error', {
            closeButton: true,
          });
        } else {
          this.dataSource.data = this.regionModels;
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

  editRegion(regionModel: Region) {
    if (regionModel) {
      this.router.navigate(['/regions/edit', regionModel.RegionId], { relativeTo: this.route });
    } else {
      this.router.navigate(['/regions/edit', 0]);
    }
  }

  confirmDelete(regionModel: Region) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.regionService.deleteRegion(regionModel)
          .subscribe(results => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(item => item !== regionModel);
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