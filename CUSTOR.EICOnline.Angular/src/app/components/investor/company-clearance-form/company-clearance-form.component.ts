import {AfterContentChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DataSharingService} from "../../../Services/data-sharing.service";
import {ConfigurationService} from "@custor/services/configuration.service";
import {ToastrService} from "ngx-toastr";
import {AppConfiguration} from "../../../config/appconfig";
import {CompanyClearanceService} from "./company-clearance.service";
import {CapitalRegistrationModel} from "../../../model/CapitalRegistration.model";
import {MatTableDataSource} from "@angular/material";
import {FormService} from "@custor/validation/custom/form";
import {CompanyClearanceModel} from "./CompanyClearance.Model";
import {ErrorMessage} from "@custor/services/errMessageService";

@Component({
  selector: 'app-company-clearance-form',
  templateUrl: './company-clearance-form.component.html',
  styleUrls: ['./company-clearance-form.component.scss']
})
export class CompanyClearanceFormComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {

  loadingIndicator: boolean;
  companyClearanceForm: FormGroup;
  public editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private errMsg: ErrorMessage,
              private formService: FormService,
              public dataSharing: DataSharingService,
              public companyClearanceService: CompanyClearanceService,
              private configService: ConfigurationService,
              private toastr: ToastrService,
              private appConfig: AppConfiguration,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.companyClearanceForm = this.fb.group({
      CompanyClearanceId: [''],
      CompanyNameOneEnglish: ['', Validators.required],
      CompanyNameOneAmharic: ['', Validators.required],
      CompanyNameTwoEnglish: ['', Validators.required],
      CompanyNameTwoAmharic: ['', Validators.required],
      CompanyNameThreeEnglish: ['', Validators.required],
      CompanyNameThreeAmharic: ['', Validators.required],
    })
  }

  get companyNameOneEnglish() {
    return this.companyClearanceForm.get('CompanyNameOneEnglish');
  }

  get companyNameOneAmharic() {
    return this.companyClearanceForm.get('CompanyNameOneAmharic');
  }

  get companyNameTwoEnglish() {
    return this.companyClearanceForm.get('CompanyNameTwoEnglish');
  }

  get companyNameTwoAmharic() {
    return this.companyClearanceForm.get('CompanyNameTwoAmharic');
  }

  get companyNameThreeEnglish() {
    return this.companyClearanceForm.get('CompanyNameThreeEnglish');
  }

  get companyNameThreeAmharic() {
    return this.companyClearanceForm.get('CompanyNameThreeAmharic');
  }

  onSubmit() {
    this.formService.markFormGroupTouched(this.companyClearanceForm);
    if (this.companyClearanceForm.valid) {
      if (!this.editMode) {
        this.companyClearanceForm.removeControl('CompanyClearanceId');
        this.companyClearanceService.create(this.companyClearanceForm.value)
          .subscribe((result: CompanyClearanceModel) => {
            this.toastr.success("successfully saved");
            this.companyClearanceForm.reset();
          }, error => this.toastr.error(this.errMsg.getError(error)));
        this.companyClearanceForm.addControl('CompanyClearanceId', new FormControl(''));

      } else {
        // Todo  Id is correct
        this.companyClearanceService.update(this.companyClearanceForm.value,
          1)
          .subscribe(result => {

          }, error => this.toastr.error(this.errMsg.getError(error)));
      }
    } else {
    }
  }

  onBack() {
    window.history.back();
  }

  ngAfterContentChecked(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }


}
