import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
// tslint:disable-next-line:max-line-length
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
// import { SharedModule } from "../../@custor/modules/shared.module";
import {HttpClient} from '@angular/common/http';
import {Investor} from '../../model/investor';
import {InvestorService} from './investor.service';
import {Utilities} from '@custor/helpers/utilities';
import {ToastrService} from 'ngx-toastr';
import {fadeInOut} from '@custor/services/animations';
// import {ErrorMessage} from '../../../@custor/services/errMessageService';
import {AngConfirmDialogComponent} from '@custor/components/confirm-dialog/confirm-dialog.component';
import {AuthService} from '@custor/services/security/auth.service';
import {AccountService} from '@custor/services/security/account.service';
import {Permission} from '../../model/security/permission.model';
import {DataSharingService} from '../../Services/data-sharing.service';
import {ProjectModel} from '../../model/project.model';
import {ProjectProfileService} from '../../Services/project-profile.service';

@Component({
  selector: 'app-investor-list',
  templateUrl: './investor-list.component.html',
  styleUrls: ['./investor-list.component.scss'],
  animations: [fadeInOut]
})

export class InvestorListComponent implements OnInit, AfterViewInit {
  selectedInvestor: Investor;
  investors: Investor[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isInvestor: boolean;
  displayedColumns = ['FirstNameEng', 'FatherNameEng', 'RegistrationNumber', 'RegistrationDate', 'Tin', 'actions'];
  dataSource: MatTableDataSource<Investor>;
  dataSource2: any;

  displayedColumnsProject = ['No', 'ProjectName', 'startDate', 'InvestmentActivity', 'status', 'Action'];
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  sourceInvestor: Investor;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;
  public investorShow = true;
  private projectList: ProjectModel[];
  private title: string;

  constructor(private http: HttpClient,
              private invService: InvestorService,
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

  addProject() {
    localStorage.setItem('ServiceId', '13');
    setTimeout(() => this.dataSharing.steeperIndex.next(1), 0);

    setTimeout(() => this.dataSharing.isNew.next(true), 0);
    this.router.navigate(['pro/', 0]);
  }

  getInvestorsByTin() {
    // if (!this.canViewInvestors) {
    //     this.router.navigate(['denied']);
    // }
    this.loadingIndicator = true;
    this.invService.getInvestorByTIN(this.accountService.currentUser.Tin)
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

  getInvestorsByUserId() {
    // if (!this.canViewInvestors) {
    //     this.router.navigate(['denied']);
    // }
    this.loadingIndicator = true;
    this.invService.getInvestorByUserId(this.accountService.currentUser.Id)
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

  editInvestor(investor: Investor) {
    console.log(this.investors);
    if (investor) {
      this.router.navigate(['/investor-tab', investor.InvestorId], {relativeTo: this.route});
    } else {
      this.router.navigate(['/investor-tab', 0]);
    }
  }

  confirmDelete(investor: Investor) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.invService.deleteInvestor(investor)
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

  select(InvestorId: any) {
    localStorage.setItem('InvestorId', InvestorId);
    this.loadingIndicator = true;
    this.projectService.getProjectByInvestorId(InvestorId)
      .subscribe(result => {
          this.projectList = result;
          console.log(result);
          this.title = 'ProjectDetail';
          this.investorShow = false;
          if (!this.projectList) {
            this.loadingIndicator = false;
            this.toastr.error('No records were found to list', 'Error', {
              closeButton: true,
            });
          } else {
            this.loadingIndicator = false;
            this.dataSource2 = new MatTableDataSource<ProjectModel>(result);
            console.log(result);
            this.dataSource2.paginator = this.paginator;
          }
        },
        error => {
          this.toastr.error(`Error: "${Utilities.getHttpResponseMessage(error)}"`);
        });
    this.loadingIndicator = false;

  }

  editProject(projectId: number, serviceApplicationId: any, serviceId: any) {
    localStorage.setItem('ServiceApplicationId', serviceApplicationId);
    localStorage.setItem('ServiceId', serviceId);
    // localStorage.setItem('title', title);

    setTimeout(() => this.dataSharing.steeperIndex.next(1), 0);

    setTimeout(() => this.dataSharing.isNew.next(true), 0);
    this.router.navigate(['pro/', projectId]);
  }


  projectDetail(id: number) {
    console.log(this.router.url);
    this.router.navigate(['/service-detail', id]);
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
    this.title = 'search';
    this.investorShow = true;
    this.getInvestorsByUserId();

  }
}
