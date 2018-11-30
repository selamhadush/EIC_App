import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
// import { SharedModule } from "../../@custor/modules/shared.module";
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../../model/customer';
import { CustomerService } from '../customerService';
import { ToastrService } from 'ngx-toastr';
import { AngConfirmDialogComponent } from '../../../../@custor/components/confirm-dialog/confirm-dialog.component';
import { ErrorMessage } from '../../../../@custor/services/errMessageService';
import { Utilities } from '../../../../@custor/helpers/utilities';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})

export class CustomerListComponent implements OnInit, AfterViewInit {
  title: string;
  selectedCustomer: Customer;
  customers: Customer[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['title', 'firstName', 'fatherName', 'grandName', 'actions'];
  dataSource: MatTableDataSource<Customer>;
  sourceCustomer: Customer;
  loadingIndicator: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<AngConfirmDialogComponent>;

  constructor(private http: HttpClient,
    private custService: CustomerService,
    private errMsg: ErrorMessage,
    private toastr: ToastrService, public dialog: MatDialog,
    private router: Router, private route: ActivatedRoute) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.loadingIndicator = true;
    this.custService.getCustomers()
      .subscribe(result => {
        this.customers = result;
        if (!this.customers) {
          this.toastr.error('No records were found to list', 'Error', {
            closeButton: true,
          });
        } else {
          this.dataSource.data = this.customers;
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

  editCustomer(customer: Customer) {
    if (customer) {
      this.router.navigate(['/customers/edit', customer.CustomerId], { relativeTo: this.route });
    } else {
      this.router.navigate(['/customers/edit', 0]);
    }
  }

  confirmDelete(customer: Customer) {
    this.confirmDialogRef = this.dialog.open(AngConfirmDialogComponent,
      {
        disableClose: false
      });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      this.loadingIndicator = true;
      if (result) {
        this.custService.deleteCustomer(customer)
          .subscribe(results => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(item => item !== customer);
          },
            error => {
              // tslint:disable-next-line:max-line-length
              this.toastr.error(
                `An error occured whilst deleting the customer.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                'Delete Error');
            });
      }
      this.loadingIndicator = false;
    });
  }
}