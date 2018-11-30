import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {ErrorMessage} from "@custor/services/errMessageService";
import {LookuptypesModel} from "../../../../../model/lookuptypes";
import {Utilities} from "@custor/helpers/utilities";
import {ActivatedRoute, Router} from "@angular/router";
import {AngConfirmDialogComponent} from "@custor/components/confirm-dialog/confirm-dialog.component";
import {ToastrService} from "ngx-toastr";
import {LookuptypesService} from "../lookuptypes.service";

@Component({
  selector: 'app-list-lookuptypes',
  templateUrl: './list-lookuptypes.component.html',
  styleUrls: ['./list-lookuptypes.component.scss']
})
export class ListLookuptypesComponent implements OnInit , AfterViewInit {
  lookuptypesModels: LookuptypesModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['LookUpTypeId', 'Description', 'DescriptionEnglish', 'actions'];

  dataSource: MatTableDataSource<LookuptypesModel>;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
              private lookuptypesService: LookuptypesService,
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
    this.getLookUpTypes();
  }
  getLookUpTypes() {
    this.loadingIndicator = true;
    this.lookuptypesService.getlookuptypess()
      .subscribe(result => {
          this.lookuptypesModels = result;
          if (!this.lookuptypesModels) {
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            this.dataSource.data = this.lookuptypesModels;
          }
        },
        err => {
          if (!this.errMsg.message) {
            this.toastr.error('Error! Please check if the Web Lookup Types is running');
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
  editLooluptypes(lookuptypesModel: LookuptypesModel) {
    if (lookuptypesModel) {
      this.router.navigate(['/lookuptypes/edit', lookuptypesModel.LookUpTypeId], { relativeTo: this.route });
    } else {
      this.router.navigate(['/lookuptypes/edit', 0]);
    }
  }

  confirmDelete(lookuptypesModel: LookuptypesModel) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.lookuptypesService.deletelookuptypes(lookuptypesModel)
          .subscribe(results => {
              this.loadingIndicator = false;
              this.dataSource.data = this.dataSource.data.filter(item => item !== lookuptypesModel);
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
