import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AuthService} from '@custor/services/security/auth.service';
import {AuthGuard} from '@custor/services/security/auth-guard.service';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ProjectListComponent} from './components/project-profile/project-list/project-list.component';
import {ConfirmComponent} from './components/auth/register/confirm.component';
import {LoginComponent} from './components/auth/login/login.component';
import {AccessDeniedComponent} from './components/denied/denied.component';
import {ErrorComponent} from './components/error/error.component';
import {CustomerServiceStarterComponent} from './components/my-dashboard/customerService/customerServices.component';
import {AddressComponent} from './components/project-profile/address/address.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'home',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: 'app/components/my-dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'officer-dashboard',
        loadChildren: 'app/components/officer-dashboard/officer-dashboard.module#OfficerDashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'service-list',
        component: CustomerServiceStarterComponent
      },
      {
        path: 'register',
        loadChildren: 'app/components/auth/register/register.module#RegisterModule'
      },
      {
        path: 'officer',
        loadChildren: 'app/components/officer-Task/officer.module#OfficerModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'investor',
        loadChildren: 'app/components/investor/investor.module#InvestorModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'investor-tab/:ServiceId/:id',
        loadChildren: 'app/components/investor/investor-tab/investor-tab.module#InvestorTabModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'business-tab/:ServiceId/:id',
        loadChildren: 'app/components/business/business-tab/business-tab.module#BusinessTabModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'service-detail/:id',
        loadChildren: 'app/components/project-profile/project-profile-detail/project-detail.module#ProjectDetailModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'regions',
        loadChildren: 'app/components/setting/address-tabs/region/region.module#RegionModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'zones',
        loadChildren: 'app/components/setting/address-tabs/zone/zone.module#ZoneModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'woredas',
        loadChildren: 'app/components/setting/address-tabs/Woredas/woreda.module#WoredaModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'kebeles',
        loadChildren: 'app/components/setting/address-tabs/kebele/kebele.module#KebeleModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'sectors',
        loadChildren: 'app/components/setting/category-tabs/sector/sector.module#SectorModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'subsectors',
        loadChildren: 'app/components/setting/category-tabs/subsector/subsector.module#SubsectorModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'activitys',
        loadChildren: 'app/components/setting/category-tabs/Activity/activity.module#ActivityModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'invactivitys',
        loadChildren: 'app/components/setting/category-tabs/InvActivity/invactivity.module#InvactivityModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'pro/:id',
        loadChildren: './components/project-profile/project.module#ProjectModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'project-substitute/:id',
        loadChildren: './components/project-profile/project-substitute/ProjectSubstitute.module#ProjectSubstituteModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'project-cost',
        loadChildren: './components/project-profile/project-cost/ProjectCost.module#ProjectCostModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'share',
        loadChildren: './components/project-profile/project-share/Share.module#ShareModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'product',
        loadChildren: './components/project-profile/project-product/product.module#ProductModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'employment',
        loadChildren: './components/project-profile/project-employment/employment.module#EmploymentModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'letter',
        loadChildren: './components/project-profile/letter/letter.module#LetterModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'associate',
        loadChildren: './components/investor/associate/associate.module#AssociateModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'address',
        loadChildren: 'app/components/setting/address-tabs/address.module#AddressModule',
        canActivate: [AuthGuard]
      },

      {
        path: 'admin/users',
        loadChildren: 'app/admin/user.module#UserModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/roles',
        loadChildren: 'app/admin/role.module#RoleModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'category',
        loadChildren: 'app/components/setting/category-tabs/category.module#CategoryModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'services-tab',
        loadChildren: 'app/components/setting/services-tabs/serviceTab.module#ServiceTabModule',
        canActivate: [AuthGuard]

      },
      {
        path: 'serviceprerequisites',
        loadChildren: 'app/components/setting/services-tabs/serviceprerequistie/serviceprerequiste.module#ServicePrerequsiteModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'servicesteppers',
        loadChildren: 'app/components/setting/services-tabs/servicestepper/servicestepper.module#ServicestepperModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'servicetariffs',
        loadChildren: 'app/components/setting/services-tabs/servicetariff/servicetariff.module#ServicetariffModule',
        canActivate: [AuthGuard]

      },
      {
        path: 'other',
        loadChildren: 'app/components/setting/othe-tabs/other.module#OtherModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'tariffs',
        loadChildren: 'app/components/setting/othe-tabs/tariff/tariff.module#TariffModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'sites',
        loadChildren: 'app/components/setting/othe-tabs/Site/site.module#SiteModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'project/list',
        component: ProjectListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project-renewal/:id',
        loadChildren: 'app/components/project-profile/project-renewal-tab/projectRenewal.module#ProjectRenewalModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'project-cancellation/:id',
        loadChildren: 'app/components/project-profile/project-cancellation-tab/project-cancellation-tab.module#ProjectCancellationTabModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'appointment',
        loadChildren: 'app/components/appointment/appointment.module#AppointmentModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'archive-application',
        loadChildren: 'app/components/archive-application/archive-application.module#ArchiveApplicationModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'draft-application',
        loadChildren: 'app/components/drafted-application/drafted-application.module#DraftedApplicationModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'service-info/:id',
        loadChildren: 'app/components/project-profile/service-info/serviceInfo.module#ServiceInfoModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'confirmation',
        loadChildren: 'app/components/project-profile/service-confirmation/ServiceConfirmation.module#ServiceConfirmationModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'requirement/:id',
        loadChildren: 'app/components/home/requirement/requirement.module#RequirementModule'
      },
      // {
      //   path: 'costList',
      //   loadChildren: 'app/components/project-profile/project-cost/ProjectCost.module#ProjectCostModule'
      // },
      {
        path: 'after-care',
        loadChildren: 'app/components/project-profile/aftercare/aftercare.module#AftercareModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'search-browser',
        loadChildren: 'app/components/search-browser/search-browser.module#SearchBrowserModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'investor-project-list',
        loadChildren: 'app/components/project-list-modal/InvestorProjectList.module#InvestorProjectListModule',
        canActivate: [AuthGuard]
      },

      {path: 'confirm', component: ConfirmComponent},
      {
        path: 'lookups',
        loadChildren: 'app/components/setting/lookup-tabs/lookups/lookups.module#LookupsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'lookuptypes',
        loadChildren: 'app/components/setting/lookup-tabs/lookuptypes/lookuptypes.module#LookupTypesModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'lookup-tab',
        loadChildren: 'app/components/setting/lookup-tabs/lookup.module#LookupModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'bill-of-material/:type/:ServiceApplicationId',
        loadChildren: 'app/components/incentive/bill-of-material/billOfMaterial.module#BillOfMaterialModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'bom-balance/:type/:ServiceApplicationId',
        loadChildren: 'app/components/incentive/balance/balance.module#BalanceModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'incentive-services',
        loadChildren: 'app/components/incentive/incentive-services/incentiveService.module#IncentiveServiceModule',
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'incentive-tab',
      //   loadChildren: 'app/components/incentive/incentive-tab/incentive-tab.module#IncentiveTabModule',
      //   canActivate: [AuthGuard]
      // },
      {
        path: 'denied',
        component: AccessDeniedComponent
      },
      {
        path: 'incentive-request-item/:id',
        loadChildren: 'app/components/incentive/incentive-request/incentive-request.module#IncentiveRequestModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'letter-template',
        loadChildren: 'app/components/letter/lettertemplate.module#LettertemplateModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'tax-exemption/:id',
        loadChildren: 'app/components/incentive/tax-exemption/tax-exemption.module#TaxExemptionModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'error',
        component: ErrorComponent
      },
      {
        path: 'manage-password/:id',
        loadChildren: 'app/components/auth/manage-password/manage.module#ManagePasswordModule'
      },
      {
        path: 'capital-registration/:ProjectId',
        loadChildren: 'app/components/project-profile/capital-registration/capitalRegistration.module#CapitalRegistrationModule'
      },
      {
        path: 'address/:id', component: AddressComponent
      },
      {
        path: 'requested-items-list/:categoryId/:projectId/:requestId/:Quantity/:CurrencyType/:CurrencyRate/:Phase',
        loadChildren: 'app/components/incentive/incentive-request/requested-items-list/requested-items-list.module#RequestedItemsListModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'incentive-request-history',
        loadChildren: 'app/components/incentive/incentive-request/incentive-request-history/incentive-request-history.module#IncentiveRequestHistoryModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'sparepart-balance',
        loadChildren: 'app/components/incentive/balance-sparepart/spare-part.module#SparePartModule',
        canActivate: [AuthGuard]
      },

      {path: '', component: HomeComponent},
      {path: '**', component: NotFoundComponent},
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthService, AuthGuard]
})
export class AppRoutingModule {
}
