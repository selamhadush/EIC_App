import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Kebele, Woreda } from '../../../../../model/address';
import { KebeleService } from '../kebele.service';
import { AngConfirmDialogComponent } from '@custor/components/confirm-dialog/confirm-dialog.component';
import { ErrorMessage } from '@custor/services/errMessageService';
import { Utilities } from '@custor/helpers/utilities';
import { InvestorService } from '../../../../investor/investor.service';

@Component({
  selector: 'app-list-kebele',
  templateUrl: './list-kebele.component.html',
  styleUrls: ['./list-kebele.component.css']
})
export class ListKebeleComponent implements OnInit, AfterViewInit {
  woredaModels: Woreda[];
  kebeleModels: Kebele[];
  kebeleModel: Kebele = new Kebele();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Id', 'Description', 'DescriptionEnglish', 'actions'];

  dataSource: MatTableDataSource<Woreda>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
    private subKebeleService: KebeleService,
    private errMsg: ErrorMessage,
    public investorKebeleAddress: InvestorService,
    private toastr: ToastrService, public dialog: MatDialog,
    private router: Router, private route: ActivatedRoute) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getKebeles();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*getKebeles() {
    this.loadingIndicator = true;
    this.investorKebeleAddress.getAllKebelesByLang('et')
      .subscribe(result => {
        this.kebeleModels = result;
        if (!this.kebeleModels) {
          this.toastr.error('No records were found to list', 'Error', {
            closeButton: true,
          });
        } else {
          this.dataSource.data = this.kebeleModels;
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
  }*/
  getKebeles() {
    this.loadingIndicator = true;
    this.subKebeleService.getKebeles()
      .subscribe(result => {
          this.kebeleModels = result;
          if (!this.kebeleModels) {
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });

          } else {
            this.dataSource.data = this.kebeleModels;
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

  editKebele(kebeleModel: Kebele) {
    if (kebeleModel) {
      this.router.navigate(['/kebeles/edit', kebeleModel.KebeleId], { relativeTo: this.route });
    } else {
      this.router.navigate(['/kebeles/edit', 0]);
    }
  }

  confirmDelete(kebeleModel: Kebele) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.subKebeleService.deleteKebele(kebeleModel)
          .subscribe(results => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(item => item !== kebeleModel);
          },
            error => {
              // tslint:disable-next-line:max-line-length
              this.toastr.error(
                `An error occured whilst deleting the kebele .\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                'Delete Error');
            });
      }
      this.loadingIndicator = false;
    });
  }
}
