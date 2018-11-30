import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@custor/services/security/auth.service';
import {ConfigurationService} from '@custor/services/configuration.service';
import {ToastrService} from 'ngx-toastr';
import {Utilities} from '@custor/helpers/utilities';
import {UserLogin} from '../../../model/security/user-login.model';
import {Router} from '@angular/router';
import {AccountService} from '@custor/services/security/account.service';
import {InvestorService} from '../../investor/investor.service';
import {Investor} from '../../../model/investor';
import {DataSharingService} from '../../../Services/data-sharing.service';

@Component({
  selector: 'app-login-control',
  templateUrl: './login-control.component.html',
  styleUrls: ['./login-control.component.scss']
})
export class LoginControlComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  isLoading = false;
  formResetToggle = true;
  modalClosedCallback: () => void;
  loginStatusSubscription: any;

  @Input()
  isModal = false;
  private investors: Investor[];

  constructor(
    private toastr: ToastrService,
    private invService: InvestorService,
    private sharingService: DataSharingService,
    private accountService: AccountService,
    private authService: AuthService, private router: Router,
    private configurations: ConfigurationService,
    private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.loginForm.setValue({
      userName: '',
      password: '',
      rememberMe: this.authService.rememberMe
    });

    if (this.getShouldRedirect()) {
      this.authService.redirectLoginUser();
    } else {
      this.loginStatusSubscription = this.authService.getLoginStatusEvent()
        .subscribe(isLoggedIn => {
          if (this.getShouldRedirect()) {
            this.authService.redirectLoginUser();
          }
        });
    }
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: ''
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getShouldRedirect() {
    return !this.isModal && this.authService.isLoggedIn && !this.authService.isSessionExpired;
  }

  showErrorAlert(caption: string, message: string) {
    this.toastr.info(message, caption);
  }

  closeModal() {
    if (this.modalClosedCallback) {
      this.modalClosedCallback();
    }
  }

  getUserLogin(): UserLogin {
    const formModel = this.loginForm.value;
    return new UserLogin(formModel.userName, formModel.password, formModel.rememberMe);
  }

  login() {
    this.isLoading = true;

    this.authService.login(this.getUserLogin())
      .subscribe(
        user => {
          setTimeout(() => {
            this.isLoading = false;

            this.reset();
            if (!this.isModal) {
              localStorage.setItem('loggIn', 'true');
              // this.toastr.info( `Welcome ${user.userName}!`, 'Login');
              if (this.accountService.getUserType()) {
                this.router.navigate(['/dashboard']);


              } else {

                this.router.navigate(['/officer-dashboard']);


              }
            } else {
              this.toastr.info(`Session for ${user.UserName} restored!`, 'Login');
              setTimeout(() => {
                this.toastr.info('Please try your last operation again', 'Session Restored');
              }, 500);

              this.closeModal();
            }
          }, 500);

        },
        error => {
          if (Utilities.checkNoNetwork(error)) {
            this.toastr.error(Utilities.noNetworkMessageDetail, Utilities.noNetworkMessageCaption);
            this.offerAlternateHost();
          } else {
            const errorMessage = Utilities.findHttpResponseMessage('error_description', error) ||
              Utilities.findHttpResponseMessage('error', error);

            if (errorMessage) {
              this.toastr.error(this.mapLoginErrorMessage(errorMessage), 'Unable to login');
            } else {
              this.toastr.error(this.mapLoginErrorMessage(errorMessage), 'An error occured, please try again later.\nError: ' +
                error.statusText || error.status);
            }
          }
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
  }

  offerAlternateHost() {
    if (Utilities.checkIsLocalHost(location.origin) && Utilities.checkIsLocalHost(this.configurations.baseUrl)) {
      const apiUrl = prompt('Dear Developer!\nIt appears your backend Web API service is not running...\n' +
        'Would you want to temporarily switch to the online Demo API below?(Or specify another)', this.configurations.fallbackBaseUrl);

      if (apiUrl) {
        this.configurations.baseUrl = apiUrl;
        this.configurations.tokenUrl = apiUrl;
        this.toastr.error('The target Web API has been changed to: ' + apiUrl, 'API Changed!');
      }
    }
  }


  mapLoginErrorMessage(error: string) {
    if (error === 'invalid_username_or_password') {
      return 'Invalid username or password';
    }

    if (error === 'invalid_grant') {
      return 'This account has been disabled';
    }

    return error;
  }

  reset() {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;
    });
  }

}
