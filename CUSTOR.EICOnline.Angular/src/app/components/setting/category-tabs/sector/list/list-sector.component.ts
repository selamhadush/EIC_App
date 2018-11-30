import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SectorModel } from '../../../../../model/sector';
import { SectorService } from '../sector.service';
import { ToastrService } from 'ngx-toastr';
import { AngConfirmDialogComponent } from '../../../../../../@custor/components/confirm-dialog/confirm-dialog.component';
import { ErrorMessage } from '../../../../../../@custor/services/errMessageService';
import { Utilities } from '../../../../../../@custor/helpers/utilities';

@Component({
  selector: 'app-list-sector',
  templateUrl: './list-sector.component.html',
  styleUrls: ['./list-sector.component.css']
})
export class ListSectorComponent implements OnInit, AfterViewInit {
  sectorModels: SectorModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['SectorId', 'Description', 'DescriptionEnglish', 'actions'];

  dataSource: MatTableDataSource<SectorModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
    private sectorService: SectorService,
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
    this.getSectors();
  }
  getSectors() {
    this.loadingIndicator = true;
    this.sectorService.getSectors()
      .subscribe(result => {
        this.sectorModels = result;
        if (!this.sectorModels) {
          this.toastr.error('No records were found to list', 'Error', {
            closeButton: true,
          });
        } else {
          this.dataSource.data = this.sectorModels;
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
  editSector(sectorModel: SectorModel) {
    if (sectorModel) {
      this.router.navigate(['/sectors/edit', sectorModel.SectorId], { relativeTo: this.route });
    } else {
      this.router.navigate(['/sectors/edit', 0]);
    }
  }

  confirmDelete(sectorModel: SectorModel) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.sectorService.deleteSector(sectorModel)
          .subscribe(results => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(item => item !== sectorModel);
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