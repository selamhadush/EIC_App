import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "@custor/modules/shared.module";
import {InvestorTabRoutingModule} from "../../investor/investor-tab/investor-tab-routing.module";
import {InvestorModule} from "../../investor/investor.module";
import {AssociateModule} from "../../investor/associate/associate.module";
import {OfficerModule} from "../../officer-Task/officer.module";
import {ServiceConfirmationModule} from "../../project-profile/service-confirmation/ServiceConfirmation.module";
import {ServiceInfoModule} from "../../project-profile/service-info/serviceInfo.module";
import {InvestorTabComponent} from "../../investor/investor-tab/investor-tab.component";
import {CompanyClearanceFormComponent} from "../../investor/company-clearance-form/company-clearance-form.component";
import {BusinessRoutingModule} from "./business-routing.module";
import {BusinessTabComponent} from "./business-tab.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BusinessRoutingModule,
    InvestorModule,
    AssociateModule,
    OfficerModule,
    ServiceConfirmationModule,
    ServiceInfoModule

  ],
  declarations: [
    BusinessTabComponent
  ],
  exports: [BusinessTabComponent]
})
export class BusinessTabModule {
}
