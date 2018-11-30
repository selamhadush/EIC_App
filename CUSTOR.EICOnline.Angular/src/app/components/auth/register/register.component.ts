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
import {Router} from '@angular/router';
import {Utilities} from '../../../../@custor/helpers/utilities';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy, OnInit {
  @ViewChild('form')
  private form: NgForm;
  isExisting = false;
  isNewUser = true;
  isChangePassword = false;
  private isSaving = false;
  private passwordWatcher: Subscription;
  private onUserSaved = new Subject<User>();

  @Input() user: User = new User();
  @Input() roles: Role[] = [];
  @Input() isEditMode = false;
  @Input() errors: string[] = [];
  userProfileForm: FormGroup;
  userSaved$ = this.onUserSaved.asObservable();
  loadingIndicator: boolean;
  constructor(
    private alertService: ToastrService,
    private translationService: AppTranslationService,
    private accountService: AccountService,
    private formBuilder: FormBuilder, private router: Router
  ) {
    this.buildForm();
  }

  ngOnDestroy() {
    this.passwordWatcher.unsubscribe();
  }

  ngOnInit() {
    this.formControlValueChanged();
  }

  formControlValueChanged() {
    const cTin = this.userProfileForm.get('tin');

    this.existingCustomer.valueChanges.subscribe(
      (checkStatus: boolean) => {
        if (checkStatus === true) {
          cTin.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
          // cTin.setAsyncValidators(this.isTinUnique.bind(this));
        } else {
          cTin.clearValidators();
        }
        cTin.updateValueAndValidity();
      });
  }

  private buildForm() {
    this.userProfileForm = this.formBuilder.group({
      tin: '',
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]],
        confirmPassword: ['', [Validators.required, EqualValidator('newPassword')]],
      }),
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      isExistingCustomer: false,
      // recaptcha: [null]
    });

    this.passwordWatcher = this.newPassword.valueChanges.subscribe(() =>
      this.confirmPassword.updateValueAndValidity());
  }

  public resetForm(stopEditing: boolean = false) {
    if (stopEditing) {
      this.isEditMode = false;
    }

    if (!this.user) {
      this.isNewUser = true;
      this.user = new User();
    }

    if (this.isNewUser) {
      this.isChangePassword = true;
      this.addNewPasswordValidators();
    } else {
      this.isChangePassword = false;
      this.newPassword.clearValidators();
      this.confirmPassword.clearValidators();
    }

    this.userProfileForm.reset({
      tin: this.user.Tin || '',
      userName: this.user.UserName || '',
      email: this.user.Email || '',
      password: {
        newPassword: '',
        confirmPassword: ''
      },
      fullName: this.user.FullName || '',
      phoneNumber: this.user.PhoneNumber || '',
      isExistingCustomer: false
    });
  }

  public beginEdit() {
    this.isEditMode = true;
    this.isChangePassword = false;
  }

  public save() {
    this.loadingIndicator = true;
    if (!this.form.submitted) {
      // Causes validation to update.
      this.form.onSubmit(null);
      return;
    }

    if (!this.userProfileForm.valid) {
      this.alertService.error(this.translationService.getTranslation('form.ErrorMessage'),
        this.translationService.getTranslation('form.ErrorCaption'));
      return;
    }

    this.isSaving = true;
    const editedUser = this.getEditedUser();

    if (this.isNewUser) {
      // this.accountService.newUser(editedUser).subscribe(
      //   user => this.saveCompleted(user),
      //   error => this.saveFailed(error));

      this.accountService.selfRegisterNewUser(editedUser).subscribe(
        user => this.saveCompleted(user),
        error => this.saveFailed(error));

    } else {
      this.accountService.updateUser(editedUser).subscribe(
        response => this.saveCompleted(editedUser),
        error => this.saveFailed(error));
    }

    this.loadingIndicator = false;
  }

  public cancel() {
    this.resetForm();
    this.isEditMode = false;
  }

  private getEditedUser(): UserEdit {
    const formModel = this.userProfileForm.value;
    const tempRole: string[] = ['Online Users'];
    const onlineSitecode = 'OnlineSite';
    return {
      Id: this.user.Id,
      Tin: formModel.tin,
      UserName: formModel.userName,
      FullName: formModel.fullName,
      FriendlyName: formModel.friendlyName,
      Email: formModel.email,
      PhoneNumber: formModel.phoneNumber,
      Roles: tempRole,
      CurrentPassword: '',
      NewPassword: formModel.password.newPassword,
      ConfirmPassword: formModel.password.confirmPassword,
      IsEnabled: true,
      IsLockedOut: false,
      SiteCode: onlineSitecode
    };
  }

  private saveCompleted(user?: User) {
    if (user) {
      this.user = user;
    }

    this.isSaving = false;
    this.resetForm(true);
    this.alertService.success('Your account has been registered successfully.', 'Success');
    this.onUserSaved.next(this.user);
    this.router.navigate(['/confirm']);
  }

  private saveFailed(error: any) {
    this.isSaving = false;
    // this.alertService.error('One or more errors occured whilst saving your changes:',
    //   'Save Error');
    // this.alertService.error(null, error);
    const errList = Utilities.getHttpResponseMessage(error);
    if (error.status === 400) { // bad request (validation)
      this.errors = errList;
      this.alertService.error('Please fix the listed errors', 'Error');
    } else {
      this.errors = [];
      this.alertService.error(error.status + ':' + errList[0].toString(), 'Error');
    }
  }

  private addNewPasswordValidators() {
    this.newPassword.setValidators([Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]);
    this.confirmPassword.setValidators([Validators.required, EqualValidator('newPassword')]);
  }

  public ExistingCustomerChecked(event) {
    this.isExisting = (this.isExisting === true) ? false : true;
  }

  private unlockUser() {
    this.isSaving = true;
    this.accountService.unblockUser(this.user.Id)
      .subscribe(response => {
          this.isSaving = false;
          this.user.IsLockedOut = false;
          this.userProfileForm.patchValue({
            isLockedOut: this.user.IsLockedOut
          });
          this.alertService.success('User has been successfully unlocked', 'Success');
        },
        error => {
          this.isSaving = false;
          this.alertService.error('The below errors occured whilst unlocking the user:',
            'Unblock Error');
          this.alertService.error(null, error);
        });
  }

  validateMinMax(min, max) {
    return ['', [
      Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern('[0-9]+')  //  digits only
    ]];
  }

  recaptcha;
  get tin() {
    return this.userProfileForm.get('tin');
  }

  get existingCustomer() {
    return this.userProfileForm.get('isExistingCustomer');
  }

  get userName() {
    return this.userProfileForm.get('userName');
  }

  get email() {
    return this.userProfileForm.get('email');
  }

  get password() {
    return this.userProfileForm.get('password');
  }

  get newPassword() {
    return this.password.get('newPassword');
  }

  get confirmPassword() {
    return this.password.get('confirmPassword');
  }

  get assignedRoles() {
    return this.userProfileForm.get('roles');
  }

  get canViewRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canAssignRoles() {
    return this.accountService.userHasPermission(Permission.assignRolesPermission);
  }

  get isEditingSelf() {
    return this.accountService.currentUser ? this.user.Id === this.accountService.currentUser.Id : false;
  }

  get floatLabels(): string {
    return this.isEditMode ? 'auto' : 'always';
  }

  isEmailUnique(control: FormControl) {
    const q = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.accountService.isEmailRegisterd(control.value).subscribe((response) => {
            console.log(response);

            if (response === true) {
              resolve({'isEmailUnique': true});
            } else {
              // resolve({'isEmailUnique': false});
              this.userProfileForm.get('email').updateValueAndValidity();

            }
          }, () => {
            // resolve({'isEmailUnique': }
            // );
          });
        }, 1000);
      }
    );
    // console.log(this.userProfileForm.get('email').hasError('isEmailUnique'));
    return q;
  }

  isTinUnique(control: FormControl) {
    const q = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.accountService.isTinUnique(control.value).subscribe((response) => {
            console.log(response);

            if (response === true) {
              console.log(response);
              resolve({'isTinUnique': false});
            } else {
              // resolve({'isTinUnique': true});
              this.userProfileForm.get('email').updateValueAndValidity();

            }
          }, () => {
            // resolve({'isEmailUnique': }

            // );
          });
        }, 1000);
      }
    );
    console.log(this.userProfileForm.get('tin').hasError('isTinUnique'));

    return q;
  }
}
