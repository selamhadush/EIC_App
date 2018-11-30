import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Woreda, Zone } from '../../../../../model/address';
import { WoredaService } from '../woreda.service';
import { AngConfirmDialogComponent } from '../../../../../../@custor/components/confirm-dialog/confirm-dialog.component';
import { ErrorMessage } from '../../../../../../@custor/services/errMessageService';
import { Utilities } from '../../../../../../@custor/helpers/utilities';

@Component({
  selector: 'app-list-woreda',
  templateUrl: './list-woreda.component.html',
  styleUrls: ['./list-woreda.component.css']
})
export class ListWoredaComponent implements OnInit, AfterViewInit {
  zoneModels: Zone[];
  woredaModels: Woreda[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Id', 'Description', 'DescriptionEnglish', 'actions'];

  dataSource: MatTableDataSource<Woreda>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
    private woredaService: WoredaService,
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
    this.getWoredas();
  }

  getWoredas() {
    this.loadingIndicator = true;
    this.woredaService.getWoredas()
      .subscribe(result => {
        this.woredaModels = result;
        if (!this.woredaModels) {
          this.toastr.error('No records were found to list', 'Error', {
            closeButton: true,
          });
        } else {
          this.dataSource.data = this.woredaModels;
        }
      },
        err => {
          if (!this.errMsg.message) {
            this.toastr.error('Error! Please check if the Web Woreda is running');
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

  editWoreda(woredaModel: Woreda) {
    if (woredaModel) {
      this.router.navigate(['/woredas/edit', woredaModel.WoredaId], { relativeTo: this.route });
    } else {
      this.router.navigate(['/woredas/edit', 0]);
    }
  }

  confirmDelete(woredaModel: Woreda) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.woredaService.deleteWoreda(woredaModel)
          .subscribe(results => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(item => item !== woredaModel);
          },
            error => {
              // tslint:disable-next-line:max-line-length
              this.toastr.error(
                `An error occured whilst deleting the Woreda.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                'Delete Error');
            });
      }
      this.loadingIndicator = false;
    });
  }
}