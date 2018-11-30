import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {AppTranslationService} from '../@custor/services/translation.service';
import {LocalStoreManager} from '../@custor/services/storeManager.service';
import {ConfigurationService} from '../@custor/services/configuration.service';
import {MatDialog, MatDialogConfig, MatExpansionPanel} from '@angular/material';
import {AuthService} from '../@custor/services/security/auth.service';
import {User} from './model/security/user.model';
import {Observable} from 'rxjs/Observable';
import {ServiceModel} from './model/Service.model';
import {ServiceService} from './Services/service.service';
import {DataSharingService} from './Services/data-sharing.service';
import {AccountService} from '@custor/services/security/account.service';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {NotificationService} from './Services/notification.service';
import {IncentiveLogModel} from './model/IncentiveLog.model';
import {IncentiveLogService} from './Services/incentive-log.service';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs/Subscription';
import {Permission} from './model/security/permission.model';

// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked, AfterContentChecked {
  @ViewChild('admin') adminExpander: MatExpansionPanel;
  @ViewChild('services') servicesExpander: MatExpansionPanel;
  appTitle = 'eInvest';
  userType = 'OnlineSite';
  isAdminExpanded = false;
  mobileQuery: MediaQueryList;
  user: User;
  currentUsername = '';
  isLoggedIn$: Observable<boolean> = Observable.of(true);
  isInvestor: boolean;
  serviceList: ServiceModel[] = [];
  numberOfNotification: any;
  private _mobileQueryListener: () => void;
  public checkInvestorRegistered: boolean;
  private m: IncentiveLogModel;
  public inId: number;
  private subscription: Subscription;
  public isLogged: any;

  constructor(storageManager: LocalStoreManager,
              public notificationService: NotificationService,
              private authService: AuthService,
              private translationService: AppTranslationService,
              public configurations: ConfigurationService,
              public router: Router,
              public route: ActivatedRoute,
              public accountService: AccountService,
              public dataSharing: DataSharingService,
              public dialog: MatDialog,
              public toastr: ToastrService,
              public incentiveLogService: IncentiveLogService,
              public serviceService: ServiceService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    storageManager.initialiseStorageSyncListener();

    translationService.addLanguages(['en', 'et']);
    translationService.setDefaultLanguage('et'); // default
    this.CheckLoginStatus();
    this.m = new IncentiveLogModel();

  }

  ngOnInit() {
    localStorage.setItem('loggIn', 'false');
    this.getAllServices();
    this.checkInvestor();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const url = (<NavigationStart>event).url;
        if (url !== url.toLowerCase()) {
          this.router.navigateByUrl((<NavigationStart>event).url.toLowerCase());
        }

        if (this.adminExpander && url.indexOf('admin') > 0) {
          this.adminExpander.open();
        }
        if (this.servicesExpander && url.indexOf('services') > 0) {
          this.servicesExpander.open();
        }

        if ((url.indexOf('dashboard') > 0)) {
          if (this.authService.isLoggedIn) {
            setTimeout(() => this.isLoggedIn$ = Observable.of(true));
            this.countNotification(this.accountService.currentUser.Id);
            this.getUserType();
            // this.CheckLoginStatus();

          } else {
            setTimeout(() => this.isLoggedIn$ = Observable.of(false));
          }
        } else {
          if (this.authService.isLoggedIn) {
            setTimeout(() => this.isLoggedIn$ = Observable.of(true));
            this.countNotification(this.accountService.currentUser.Id);
            this.getUserType();


          } else {
            setTimeout(() => this.isLoggedIn$ = Observable.of(false));
          }
        }
      }
    });
  }

  gotoCustomerRegistration() {
    this.router.navigate(['investor-tab/1235/0']);
    localStorage.setItem('ServiceId', '1235');
  }

  getUserType() {
    this.isInvestor = this.accountService.getUserType();

  }

  CheckLoginStatus() {
    if (this.authService.isLoggedIn) {
      // Get current user profile
      this.user = this.authService.currentUser;
      this.currentUsername = this.user.UserName;
      // setTimeout(() => this.isLoggedIn$ = Observable.of(true), 1000);

      // this.router.navigateByUrl('/servicestarter');
    }

    this.isLoggedIn$ = Observable.of(false);
    // this.router.navigateByUrl('/login');
  }

  DoLogin() {
    if (this.authService.isLoggedIn) {
      this.logout();
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    this.currentUsername = '';
    this.clearLocalStorage();
    this.authService.logout();
    this.authService.redirectLogoutUser();
    setTimeout(() => this.isLoggedIn$ = Observable.of(false));
    localStorage.setItem('loggIn', 'false');

  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  get currentLang(): string {
    return this.configurations.language || 'et';
  }

  getAllServices() {
    this.serviceService.getAll()
      .subscribe(result => {
        this.serviceList = result;
        console.log(result);
      });
  }

  checkInvestor() {
    // console.log(this.accountService.currentUser.Tin);
    // if (this.accountService.currentUser.Tin !== null) {
    //   this.checkInvestorRegistered === true;
    // }
  }

  public startService(serviceId: any, title: string) {
    localStorage.setItem('ServiceId', serviceId);
    localStorage.setItem('title', title);
    localStorage.removeItem('ServiceApplicationId');
    this.router.navigate(['/search-browser']);


  }


  clearLocalStorage() {
    localStorage.clear();
  }

  viewNotification() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      'top': '46px',
      'right': '230px'

    };
    dialogConfig.width = '430px';
    dialogConfig.maxHeight = '400px';
    dialogConfig.panelClass = 'padding:1px;';

    this.dialog.open(NotificationsComponent, dialogConfig);

  }

  countNotification(investorId: any) {
    this.notificationService.CountNotification(investorId)
      .subscribe(result => {
        this.numberOfNotification = result;
      });
  }

  ngAfterContentChecked(): void {
    this.isLogged = localStorage.getItem('loggIn');
    // if()
    // this.currentUsername = this.user.UserName ? this.user.UserName === 'undefined' :;
    // console.log(this.currentUsername);
  }

  ngAfterViewChecked(): void {
    if (this.authService.isLoggedIn) {
      // Get current user profile
      this.user = this.authService.currentUser;
      this.currentUsername = this.user.UserName;
    }

  }

  Investor() {
    if (localStorage.getItem('InvestorId') === 'null') {
      this.router.navigate(['investor-tab/1235/0']);
    } else {
      this.router.navigate(['/investor/edit', localStorage.getItem('InvestorId')]);

    }
  }

  get canManageAftercareData() {
    return this.accountService.userHasPermission(Permission.ManageAftercareDataPermission);
  }

  toServiceList() {
    if (localStorage.getItem('InvestorId') !== null) {
      // this.dialog.open(CustomerServiceStarterComponent);
      this.router.navigate(['/service-list']);
    } else {

      this.toastr.warning('Please  complete investor profile before request any service!!', 'Info');
      this.router.navigate(['investor-tab/0/', 0]);
    }

  }

  toMangerList() {
    if (localStorage.getItem('InvestorId') !== null) {
      this.router.navigate(['associate/list']);
    } else {
      this.toastr.warning('Please  complete investor profile before request any service!!', 'Info');
      this.router.navigate(['investor-tab/0/', 0]);
    }

  }

  get canManageManageAftercareData() {
    return this.accountService.userHasPermission(Permission.ManageAftercareDataPermission);
  }

  get canManageDispatchIncentivesServices() {
    return this.accountService.userHasPermission(Permission.DispatchIncentivesServicesPermission);
  }

  get canManageApproveIncentiveUploadedItems() {
    return this.accountService.userHasPermission(Permission.ApproveIncentiveUploadedItemsPermission);
  }

  get canManageManageIncentiveAssignedServices() {
    return this.accountService.userHasPermission(Permission.ManageIncentiveAssignedServicesPermission);
  }

  get canViewReadOnlyData() {
    return this.accountService.userHasPermission(Permission.ViewReadOnlyDataPermission);
  }

  get canManageLookupsPermission() {
    return this.accountService.userHasPermission(Permission.manageLookupsPermission);
  }

  get canManageSettings() {
    return this.accountService.userHasPermission(Permission.manageSettingsPermission);
  }

  get canViewServiceApplication() {
    return this.accountService.userHasPermission(Permission.viewServiceApplication);
  }

  get canViewTasks() {
    return this.accountService.userHasPermission(Permission.viewServiceList);
  }

  get canManageRoles() {
    return this.accountService.userHasPermission(Permission.manageRolesPermission);
  }

  get canManageAdmins() {
    return this.accountService.userHasPermission(Permission.manageSiteAdministratorsPermission);
  }

  get canManageUsers() {
    return this.accountService.userHasPermission(Permission.manageUsersPermission);
  }
}

export interface UserLanguage {
  name: string;
  locale: string;
}
