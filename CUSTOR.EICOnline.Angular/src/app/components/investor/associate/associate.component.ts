import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Permission} from '../../../model/security/permission.model';
import {AccountService} from '@custor/services/security/account.service';
import {AuthService} from '@custor/services/security/auth.service';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {AngConfirmDialogComponent} from '@custor/components/confirm-dialog/confirm-dialog.component';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {Utilities} from '@custor/helpers/utilities';
import {InvestorService} from '../investor.service';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AssociateService} from '../../../Services/associate.service';
import {AssociateModel} from '../../../model/associate.model';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.scss']
})
export class AssociateComponent implements OnInit, AfterViewInit {

  investors: AssociateModel[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isInvestor: boolean;
  displayedColumns = ['FirstNameEng', 'FatherNameEng', 'actions'];
  dataSource: MatTableDataSource<AssociateModel>;

  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;


  constructor(private http: HttpClient,
              private invService: InvestorService,
              private associateService: AssociateService,
              public projectService: ProjectProfileService,
              private accountService: AccountService,
              private authService: AuthService,
              private dataSharing: DataSharingService,
              private toastr: ToastrService, public dialog: MatDialog,
              private router: Router, private route: ActivatedRoute) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    if (this.accountService.getUserType()) {
      console.log(this.accountService.currentUser.Tin);
      this.isInvestor = this.accountService.getUserType();
      if (this.accountService.currentUser.Tin !== 'null' && this.accountService.currentUser.Tin !== '') {
        this.getInvestorsByUserId();
      } else {
        this.getInvestorsByUserId();
      }
    } else {
      this.getInvestorsByUserId();

    }
  }


  getInvestorsByUserId() {
    // if (!this.canViewInvestors) {
    //     this.router.navigate(['denied']);
    // }
    this.loadingIndicator = true;
    this.associateService.getAssociateByInvestorId(+localStorage.getItem('InvestorId'))
      .subscribe(result => {
          console.log(result);
          this.investors = result;
          if (!this.investors) {
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            this.dataSource.data = this.investors;
          }
        },
        error => {
          this.toastr.error(`Error: "${Utilities.getHttpResponseMessage(error)}"`);
        });
    this.loadingIndicator = false;
  }


  get canViewInvestors() {
    return this.accountService.userHasPermission(Permission.viewInvestorsPermission);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editInvestor(investor: AssociateModel) {
    console.log(localStorage.getItem('InvestorId'));
    if (localStorage.getItem('InvestorId') !== null) {
      if (investor) {
        this.router.navigate(['/associate/form/', investor.AssociateId], {relativeTo: this.route});
      } else {
        this.router.navigate(['/associate/form', 0]);
      }
    } else {
      this.toastr.warning('Please Add Investor Profile ', 'Info');
      this.router.navigate(['/investor/edit', 0]);

    }

  }

  confirmDelete(investor: AssociateModel) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.associateService.delete(investor.AssociateId)
          .subscribe(results => {
              this.loadingIndicator = false;
              this.dataSource.data = this.dataSource.data.filter(item => item !== investor);
            },
            error => {
              // tslint:disable-next-line:max-line-length
              this.toastr.error(
                `An error occured whilst deleting the investor.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                'Delete Error');
            });
      }
      this.loadingIndicator = false;
    });
  }


  deleteProject(id: number) {
    console.log(id);
    const response = confirm('Do you want to Delete this Project ?');
    if (response === true) {
      this.projectService.delete(id)
        .subscribe(() => {
          // this.getAllServiceApplication();
        });
      return true;
    } else {
      return false;
    }
  }

  back() {
    window.history.back();

  }
}
