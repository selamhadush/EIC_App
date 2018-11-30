import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {ServiceApplicationService} from '../../../Services/service-application.service';
import {ServiceApplicationModel} from '../../../model/ServiceApplication.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../Services/Order.service';
import {AccountService} from '../../../../@custor/services/security/account.service';
import {OrderModel} from '../../../model/Order.model';
import {FormService} from '../../../../@custor/validation/custom/form';
import {ServiceTariffModel} from '../../../model/servicetariff';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit, AfterViewChecked {
  TotalAmount: number;
  orderForm: FormGroup;
  paid = false;
  today: Date;
  payment: OrderModel;
  serviceTariff: any;
  investorName: string;
  public formErrors = {
    ReceiptNumber: '',
    CheckNo: '',
  };

  constructor(
    public serviceApplicationService: ServiceApplicationService,
    public fb: FormBuilder,
    public formService: FormService,
    public accountService: AccountService,
    public orderService: OrderService) {
    this.today = new Date();
  }

  ngOnInit() {
    // this.getServiceApplication();
    this.initForm();
    this.getServiceApplication(localStorage.getItem('ServiceApplicationId'));

    // console.log(localStorage.getItem('ServiceApplicationId'));
  }

  initForm() {
    this.orderForm = this.fb.group({
      ServiceApplicationId: new FormControl(),
      ReceiptNumber: new FormControl('', Validators.required),
      CheckNo: new FormControl('', Validators.required),
      TotalAmount: [''],
      CashierUserName: [''],
      // CashierUserId: [''],
      PaymentDate: ['']
    });
  }

  generatePDF() {
    const doc = new jsPDF();
    const width = doc.internal.pageSize.width;
    const height = doc.internal.pageSize.height;
    html2canvas(document.getElementById('payment')).then(function (canvas) {
      const img = canvas.toDataURL('image/jpeg', 'JPEG');
      doc.addImage(img, 'JPEG', 5, 5, 200, 287);
      doc.save(`payment-${Date.now()}.pdf`);
    });


  }

  Print() {
    window.print();
  }

  getServiceApplication(id: any) {
    // console.log(localStorage.getItem('serviceApplicationId'));
    console.log(id);
    this.serviceApplicationService.getOneById(id)
      .subscribe((result: ServiceApplicationModel) => {
        console.log(result);
        this.TotalAmount = result.Service.ServiceTariff[0].Tariff.Fee;
        this.serviceTariff = result.Service.ServiceTariff;
        this.getTotalAmount(this.serviceTariff);
        this.investorName = result.Investor.InvestorName;
        // console.log(result.Investor.InvestorName);
      });
  }

  getTotalAmount(serviceTariff: ServiceTariffModel[]) {
    this.TotalAmount = 0;
    for (const data of serviceTariff) {
      this.TotalAmount = this.TotalAmount + data.Tariff.Fee;
    }
    console.log(this.TotalAmount);
  }

  ngAfterViewInit(): void {
    // console.log(this.accountService.currentUser);
  }

  ngAfterViewChecked() {
    this.orderForm.patchValue({
      ServiceApplicationId: localStorage.getItem('ServiceApplicationId'),
      TotalAmount: this.TotalAmount,
      CashierUserName: this.accountService.currentUser.FullName,
      // CashierUserId: this.accountService.currentUser.id,
      PaymentDate: new Date(),
    });
  }

  onSubmit() {
    this.formService.markFormGroupTouched(this.orderForm);
    if (this.orderForm.valid) {
      this.orderService.create(this.orderForm.value)
        .subscribe(result => {
          // console.log(result);
          this.payment = result;
          this.paid = true;
        });
    } else {
      this.formErrors = this.formService.validateForm(this.orderForm, this.formErrors, false);
    }
  }
}
