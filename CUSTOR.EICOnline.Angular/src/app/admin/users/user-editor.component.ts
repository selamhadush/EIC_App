import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

import {AppTranslationService} from '../../../@custor/services/translation.service';
import {AccountService} from '../../../@custor/services/security/account.service';
import {ToastrService} from 'ngx-toastr';

import {User} from '../../model/security/user.model';
import {UserEdit} from '../../model/security/user-edit.model';
import {Role} from '../../model/security/role.model';
import {Permission} from '../../model/security/permission.model';
import {EqualValidator} from '../../../@custor/validation/equal.validator';
import {SitesService} from '../../components/setting/othe-tabs/site/site.service';
import {SiteModel} from '../../model/Site.model';
import {determineId} from '../../../@custor/helpers/compare';
import {Utilities} from '../../../@custor/helpers/utilities';

@Component({
  selector: 'user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnChanges, OnDestroy, OnInit {
  @ViewChild('form')
  private form: NgForm;
  isNewUser = false;
  isChangePassword = false;
  public isSaving = false;
  private passwordWatcher: Subscription;
  private onUserSaved = new Subject<User>();
  sitesList: SiteModel[] = [];
  @Input() user: User = new User();
  @Input() roles: Role[] = [];
  @Input() isEditMode = false;
  @Input() errors: string[] = [];
  private CONST_ADMIN = 'site administrators';
  private CONST_SUPERADMIN = 'super administrators';
  private CONST_ONLINEUSERS = 'online users';
  private CONST_ONLINESITE = 'onlinesite';
  private CONST_HEADOFFICE = 'headoffice';

  userProfileForm: FormGroup;
  userSaved$ = this.onUserSaved.asObservable();

  constructor(
    private alertService: ToastrService,
    private translationService: AppTranslationService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private sitesSer: SitesService) {
    this.buildForm();


  }

  ngOnInit() {
    this.formControlValueChanged();

  }

  getSites() {

    this.sitesSer.getSites()
      .subscribe(result => {
        this.sitesList = result;

      });
    //     return this.sitesList=this.sitesList.filter((item) => {
    //         return (item.SiteCode != this.CONST_ONLINESITE &&
    //             item.SiteCode  != this.CONST_HEADOFFICE);
    //    });

  }

  get userSite() {
    return this.userProfileForm.get('userSite');
  }

  get tin() {
    return this.userProfileForm.get('tin');
  }

  get fullName() {
    return this.userProfileForm.get('fullName');
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

  get currentPassword() {
    return this.password.get('currentPassword');
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

  get canManageAdmins() {
    return this.accountService.userHasPermission(Permission.manageSiteAdministratorsPermission);
  }

  get isEditingSelf() {
    return this.accountService.currentUser ? this.user.Id === this.accountService.currentUser.Id : false;
  }

  get assignableRoles(): Role[] {

    if (this.canManageAdmins) {
      return this.roles = this.roles.filter((item) => {
        return item.Name.toLowerCase() === this.CONST_ADMIN;
      });
    }

    return this.roles = this.roles.filter((item) => {
      return (item.Name.toLowerCase() !== this.CONST_ADMIN &&
        item.Name.toLowerCase() !== this.CONST_SUPERADMIN &&
        item.Name.toLowerCase() !== this.CONST_ONLINEUSERS);
    });
  }

  get floatLabels(): string {
    return this.isEditMode ? 'auto' : 'always';
  }


  ngOnChanges() {
    if (this.user) {
      this.isNewUser = false;
    } else {
      this.isNewUser = true;
      this.user = new User();
      this.user.IsEnabled = true;
    }
    this.setRoles();
    this.resetForm();
  }

  formControlValueChanged() {
    const cTin = this.userProfileForm.get('tin');

    this.tin.valueChanges.subscribe(
      (tinval: string) => {
        if (tinval.length > 0) {
          cTin.setValidators([Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);
        } else {
          cTin.clearValidators();
        }
        cTin.updateValueAndValidity();
      });
    this.getSites();
    // if the current user is a site admin, he should only manage users of his own site
    if (!this.canManageAdmins) {
      this.userSite.setValue(this.accountService.currentUser.SiteCode);
    }

  }

  ngOnDestroy() {
    this.passwordWatcher.unsubscribe();
  }

  public setUser(user?: User, roles?: Role[]) {
    this.user = user;
    if (roles) {
      this.roles = [...roles];
    }

    this.ngOnChanges();
  }


  private buildForm() {
    this.userProfileForm = this.formBuilder.group({
      tin: '',
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: this.formBuilder.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]],
        confirmPassword: ['', [Validators.required, EqualValidator('newPassword')]],
      }),
      roles: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      isEnabled: '',
      userSite: ['', Validators.required]
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

    this.currentPassword.clearValidators();

    this.userProfileForm.reset({
      tin: this.user.Tin || '',
      userName: this.user.UserName || '',
      email: this.user.Email || '',
      password: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      roles: this.user.Roles || [],
      fullName: this.user.FullName || '',
      phoneNumber: this.user.PhoneNumber || '',
      isEnabled: this.user.IsEnabled,
      userSite: this.user.SiteCode || ''
    });
  }

  private setRoles() {
    if (this.user.Roles) {
      for (const role of this.user.Roles) {
        if (!this.roles.some(r => r.Name === role)) {
          this.roles.unshift(new Role(role));
        }
      }
    }
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
    // if (!this.canManageAdmins)
    // {
    //     if (this.userSite.value.toLowerCase()!=this.accountService.currentUser.SiteCode.toLowerCase())
    //     {
    //         this.alertService.error("You can not select a site that is different from yours!");
    //         return;
    //     }
    // }

    this.isSaving = true;
    const editedUser = this.getEditedUser();
// console.debug(editedUser);
    if (this.isNewUser) {
      // console.debug("Is New");
      this.accountService.newUser(editedUser).subscribe(
        user => this.saveCompleted(user),
        error => this.saveFailed(error));
    } else {
      // console.debug("Not New");
      this.accountService.updateUser(editedUser).subscribe(
        response => this.saveCompleted(editedUser),
        error => this.saveFailed(error));
    }
  }

  public cancel() {
    this.resetForm();
    this.isEditMode = false;
  }

  private getEditedUser(): UserEdit {
    const formModel = this.userProfileForm.value;
    const onlineSitecode = 'OnlineSite';
    return {
      Id: this.user.Id,
      Tin: formModel.tin,
      UserName: formModel.userName,
      FullName: formModel.fullName,
      FriendlyName: formModel.FriendlyName,
      Email: formModel.email,
      PhoneNumber: formModel.phoneNumber,
      Roles: formModel.roles,
      CurrentPassword: formModel.password.currentPassword,
      NewPassword: formModel.password.newPassword,
      ConfirmPassword: formModel.password.confirmPassword,
      IsEnabled: formModel.isEnabled,
      IsLockedOut: this.user.IsLockedOut,
      SiteCode: formModel.userSite
    };
  }

  private saveCompleted(user?: User) {
    if (user) {
      this.raiseEventIfRolesModified(this.user, user);
      this.user = user;
    }

    this.isSaving = false;
    // this.resetForm(true);
    if (this.isNewUser) {
      this.alertService.success(`User \"${this.userName}\" were created successfully`, 'Success');
    } else {
      this.alertService.success(`Changes to user \"${this.userName}\" were saved successfully`, 'success');
    }
    this.onUserSaved.next(this.user);
  }

  private saveFailed(error: any) {
    const errList = Utilities.getHttpResponseMessage(error);
    if (error.status === 400) { // bad request (validation)
      this.errors = errList.toString().split(',');
      console.log(errList.length);
      // this.alertService.error('Please fix the listed errors', 'Error');
    } else {
      this.errors = [];
      this.alertService.error(error.status + ':' + errList[0].toString(), 'Error');
    }
    this.isSaving = false;
    // this.alertService.error('One or more errors occured whilst saving your changes:',
    //   'Save Error');
    // this.alertService.error(null, error);
  }

  private raiseEventIfRolesModified(currentUser: User, editedUser: User) {
    const rolesAdded = this.isNewUser ? editedUser.Roles : editedUser.Roles.filter(role => currentUser.Roles.indexOf(role) === -1);
    const rolesRemoved = this.isNewUser ? [] : currentUser.Roles.filter(role => editedUser.Roles.indexOf(role) === -1);

    const modifiedRoles = rolesAdded.concat(rolesRemoved);

    if (modifiedRoles.length) {
      setTimeout(() => this.accountService.onRolesUserCountChanged(modifiedRoles));
    }
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  private changePassword() {
    this.isChangePassword = true;
    this.addCurrentPasswordValidators();
    this.addNewPasswordValidators();
  }

  private addCurrentPasswordValidators() {
    this.currentPassword.setValidators(Validators.required);
  }

  private addNewPasswordValidators() {
    this.newPassword.setValidators([Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]);
    this.confirmPassword.setValidators([Validators.required, EqualValidator('newPassword')]);
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


}
