import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {AccountService} from '../../../../@custor/services/security/account.service';
import {ServiceApplicationModel} from '../../../model/ServiceApplication.model';
import {ServiceApplicationService} from '../../../Services/service-application.service';
import {NotificationService} from '../../../Services/notification.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ServiceService} from '../../../Services/service.service';
import {ServiceModel} from '../../../model/Service.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, AfterContentChecked {
  userName: string;
  investorName: string;
  UserId: string;
  notificationForm: FormGroup;
  InvestorId: any;
  private ServiceApplicationId: string;
  templateMessage = 'Message';
  private allServices: ServiceModel[];

  constructor(
    public accountService: AccountService,
    public notificationService: NotificationService,
    public fb: FormBuilder,
    public toast: ToastrService,
    private serviceService: ServiceService,
    public serviceApplicationService: ServiceApplicationService) {
  }

  ngOnInit() {
    this.userName = this.accountService.currentUser.FullName;
    this.getServiceApplication(localStorage.getItem('ServiceApplicationId'));
    this.initForm();
    this.getAllService();
  }

  getServiceApplication(id: any) {
    // console.log(localStorage.getItem('serviceApplicationId'));
    this.serviceApplicationService.getServiceApplicationWithInvestor(id)
      .subscribe((result: ServiceApplicationModel) => {
        console.log(result);
        this.investorName = result.Investor.InvestorNameEng;
        this.ServiceApplicationId = result.ServiceApplicationId;
        this.UserId = result.Investor.UserId;
        this.InvestorId = result.InvestorId;
        this.templateMessage = 'Dear ' +
          this.investorName +
          ', We already  received  your ' +
          this.getServiceName(result.ServiceId) + ' ' +
          ' application Request case number ' + result.CaseNumber + '' +
          ' Your Application has been reviewed by our officer ';
        this.notificationForm.patchValue({
          ToUserId: this.UserId,
          UserId: this.UserId,
          ServiceApplicationId: this.ServiceApplicationId,
          Message: this.templateMessage,
        });
      });
  }

  initForm() {
    this.notificationForm = this.fb.group({
      Subject: 'EIC Notification',
      UserId: '',
      ServiceApplicationId: '',
      CurrentStatus: '',
      Message: '',
      ToUserId: '',
      FromUserId: this.accountService.currentUser.FullName

    });
  }

  Approve() {
    this.notificationForm.patchValue({
      CurrentStatus: 44447,

    });
    this.notificationService.create(this.notificationForm.value)
      .subscribe(result => {
        console.log(result);
        this.toast.success('message has been sent', 'Message');
      });
  }

  InComplete() {
    this.notificationForm.patchValue({
      CurrentStatus: 44448,

    });
    this.notificationService.create(this.notificationForm.value)
      .subscribe(result => {
        console.log(result);
        this.toast.success('message has been sent', 'Message');
      });
  }

  getAllService() {
    this.serviceService.getAll()
      .subscribe(result => {
        // console.log(result)
        this.allServices = result;
      });
  }


  getServiceName(serviceId: any): any {
    // this.allServices.filter((item) => {
    //   return item.ServiceId === serviceId;
    // });
    for (const services of this.allServices) {
      if (services.ServiceId === serviceId) {
        return services.NameEnglish;
      }
    }
    return null;
  }

  ngAfterContentChecked(): void {
  }
}
