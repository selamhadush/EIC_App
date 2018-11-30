import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

import {AppTranslationService} from '../../../../@custor/services/translation.service';
import {AccountService} from '../../../../@custor/services/security/account.service';
import {ToastrService} from 'ngx-toastr';

import {User} from '../../../model/security/user.model';
import {UserEdit} from '../../../model/security/user-edit.model';
import {Role} from '../../../model/security/role.model';
import {EqualValidator} from '../../../../@custor/validation/equal.validator';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManagePasswordComponent implements OnDestroy, OnInit {
  @ViewChild('form')
  private form: NgForm;
  isNewUser = true;
  showOldPassword = false;
  isChangePassword = false;
  private passwordWatcher: Subscription;
  private onUserSaved = new Subject<User>();
  @Input() dialogTitle: string;
  @Input() oldPasswordCaption: string;
  @Input() actionCaption: string;
  @Input() user: User = new User();
  @Input() roles: Role[] = [];
  @Input() isEditMode = false;

  userProfileForm: FormGroup;
  userSaved$ = this.onUserSaved.asObservable();

  constructor(private alertService: ToastrService,
              private translationService: AppTranslationService,
              private accountService: AccountService,
              private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.buildForm();
  }

  ngOnDestroy() {
    this.passwordWatcher.unsubscribe();
  }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.params['id'];
    // console.debug(id);
    if (id === '1') { // 0=reset, 1=change
      this.isChangePassword = true;
      this.dialogTitle = 'Change Password';
      this.actionCaption = 'Change Password';
      this.oldPasswordCaption = 'Old Password';
      this.showOldPassword = true;
      // this.oldPassword.setValidators([Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]);
    } else {
      this.isChangePassword = false;
      this.dialogTitle = 'Reset Password';
      this.actionCaption = 'Reset Password';
      this.oldPasswordCaption = 'Old Password - Not Required';
      this.showOldPassword = false;
    }
    if (!this.isChangePassword) {
      const cOldPassword = this.userProfileForm.get('oldPassword');
      cOldPassword.clearValidators();
    }
  }

  formControlValueChanged() {
    if (this.isChangePassword)
      this.addOldPasswordValidator();
  }

  private buildForm() {
    this.userProfileForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]],
      password: this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]],
        confirmPassword: ['', [Validators.required, EqualValidator('newPassword')]],
      })
    });
    this.passwordWatcher = this.newPassword.valueChanges.subscribe(() =>
      this.confirmPassword.updateValueAndValidity());

    // this.formControlValueChanged();
  }

  public beginEdit() {
    this.isEditMode = true;
    this.isChangePassword = false;
  }

  public save() {
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

    const editedUser = this.getEditedUser();
    console.log(editedUser);
    this.accountService.resetAccount(editedUser).subscribe(
      response => this.saveCompleted(),
      error => this.saveFailed(error));
  }


  private getEditedUser(): UserEdit {
    const formModel = this.userProfileForm.value;
    const tempRole: string[] = ['DummyRole']; // not required here
    return {
      Id: '0', // not required
      Tin: '', // not required
      UserName: formModel.userName,
      FullName: '', // not required
      FriendlyName: '', // not required
      Email: formModel.email,
      PhoneNumber: '', // not required
      Roles: tempRole, // not required
      CurrentPassword: this.isChangePassword ? formModel.oldPassword : 'resetme',
      NewPassword: formModel.password.newPassword,
      ConfirmPassword: formModel.password.confirmPassword,
      IsEnabled: true, // to be further checked
      IsLockedOut: false, // to be further checked
      SiteCode: ''// not required
    };
  }

  private saveCompleted(user?: User) {
    if (user) {
      this.user = user;
    }
    this.alertService.success('Your account has been registered successfully.', 'Success');
    this.onUserSaved.next(this.user);
    this.router.navigate(['/confirm']);
  }

  private saveFailed(error: any) {
    this.alertService.error('One or more errors occured whilst saving your changes:',
      'Save Error');
    this.alertService.error(null, error);
  }

  validateMinMax(min, max) {
    return ['', [
      Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern('[0-9]+')  //  digits only
    ]];
  }

  private addOldPasswordValidator() {
    this.oldPassword.setValidators([Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]);
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

  get oldPassword() {
    return this.userProfileForm.get('oldPassword');
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


  get floatLabels(): string {
    return this.isEditMode ? 'auto' : 'always';
  }


}
