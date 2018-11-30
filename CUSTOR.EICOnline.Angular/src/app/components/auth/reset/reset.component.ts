import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

import {AppTranslationService} from '../../../../@custor/services/translation.service';
import {AccountService} from '../../../../@custor/services/security/account.service';
import {ToastrService} from 'ngx-toastr';

import {User} from '../../../model/security/user.model';
import {UserEdit} from '../../../model/security/user-edit.model';
import {Role} from '../../../model/security/role.model';
import {Permission} from '../../../model/security/permission.model';
import {EqualValidator} from '../../../../@custor/validation/equal.validator';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
  })

  export class ResetComponent implements OnDestroy, OnInit {
    @ViewChild('form')
    private form: NgForm;
    isChangePassword = false;
    @Input()
    dialogTitle:string;
    private passwordWatcher: Subscription;
    private onUserSaved = new Subject<User>();
    @Input() user: User = new User();
    resetPasswordForm: FormGroup;
    userSaved$ = this.onUserSaved.asObservable();

  constructor(private alertService: ToastrService,
      private translationService: AppTranslationService,
      private accountService: AccountService,
      private formBuilder: FormBuilder, 
      private router: Router, private activatedRoute:ActivatedRoute) {
        this.buildForm();
  }

  private buildForm() {
    this.resetPasswordForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]],
        confirmPassword: ['', [Validators.required, EqualValidator('newPassword')]],
      }),
    });

    
   
  }

  ngOnDestroy() {
    this.passwordWatcher.unsubscribe();
  }
  ngOnInit() {
    this.formControlValueChanged();
    const id = this.activatedRoute.snapshot.params['id'];
    // console.debug(id);
    if (id === '1') { //0=reset, 1=change
      this.isChangePassword = true;
      this.dialogTitle = 'Change Password';
      // this.oldPassword.setValidators([Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]);
    }
    else {
      this.isChangePassword = false;
      this.dialogTitle = 'Reset Password';
    }

  }
  formControlValueChanged() {
    this.passwordWatcher = this.newPassword.valueChanges.subscribe(() =>
      this.confirmPassword.updateValueAndValidity());
  }

  public save() {
    if (!this.form.submitted) {
      // Causes validation to update.
      this.form.onSubmit(null);
      return;
    }
    const editedUser = this.getEditedUser();
    this.accountService.resetAccount(editedUser).subscribe(
      response => this.saveCompleted(),
      error => this.saveFailed(error));
  }
  private getEditedUser(): UserEdit {
    const formModel = this.resetPasswordForm.value;
    const tempRole: string[] = ['DummyRole'];// not required here
    return {
      Id: "0", //not required
      Tin: '', //not required
      UserName: formModel.userName,
      FullName:'', //not required
      FriendlyName: '', //not required
      Email: formModel.email,
      PhoneNumber:'', //not required
      Roles: tempRole, //not required
      CurrentPassword: '',
      NewPassword: formModel.passwordGroup.newPassword,
      ConfirmPassword: formModel.passwordGroup.confirmPassword,
      IsEnabled: true, // to be further checked
      IsLockedOut: false, // to be further checked
      SiteCode: ''//not required
    };
  }
  private saveCompleted() {
    // this.alertService.success('Your account has been reset successfully.', 'Success');
    this.router.navigate(['/confirm']);
  }

  private saveFailed(error: any) {
   
    this.alertService.error('One or more errors occured whilst saving your changes:',
      'Save Error');
    // this.alertService.error(null, error);
  }
  public resetForm(stopEditing: boolean = false) {
   
    this.resetPasswordForm.reset({
      userName:  '',
      email:  '',
      passwordGroup: {
        newPassword: '',
        confirmPassword: ''
      },
    });
  }
  get email() {
    return this.resetPasswordForm.get('email');
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }
  // get oldPassword() {
  //   return this.resetPasswordForm.get('oldPassword');
  // }
  get userName() {
    return this.resetPasswordForm.get('userName');
  }
}