export class ProjectCostModel {
  ProjectCostId?: number;
  ProjectId: number;
  IsActual?: boolean;
  ActualCostInForeign: number;
  LandCost: number;
  BuildingCost: number;
  MachineryCost: number;
  TransportCost: number;
  OfficeEquipmentCost: number;
  OtherCapitalCost: number;
  InitialWorkingCapitalCost: number;
  EquityFinance: number;
  LoanFinance: number;
  OtherSourceFinance: number;
  OtherSourceDescription: number;
  Unit: number;
  ExchangeRate: number;
  CapitalRegistrationDatetime: Date;
  ProjectStatus: any;
  Remark: string;
  workFlowId: any;
  Quarter: any;
  RegistrationYear: any;

  constructor(ProjectCostId: number, ProjectId: number, IsActual: boolean, LandCost: number, BuildingCost: number, MachineryCost: number, TransportCost: number, OfficeEquipmentCost: number, OtherCapitalCost: number, InitialWorkingCapitalCost: number, EquityFinance: number, LoanFinance: number, OtherSourceFinance: number, OtherSourceDescription: number, Unit: number, ActualCostInForeign: number, ExchangeRate: number, Remark: string) {
    this.ProjectCostId = ProjectCostId;
    this.ProjectId = ProjectId;
    this.IsActual = IsActual;
    this.LandCost = LandCost;
    this.BuildingCost = BuildingCost;
    this.ActualCostInForeign =
      this.MachineryCost = MachineryCost;
    this.TransportCost = TransportCost;
    this.OfficeEquipmentCost = OfficeEquipmentCost;
    this.OtherCapitalCost = OtherCapitalCost;
    this.InitialWorkingCapitalCost = InitialWorkingCapitalCost;
    this.EquityFinance = EquityFinance;
    this.LoanFinance = LoanFinance;
    this.OtherSourceFinance = OtherSourceFinance;
    this.OtherSourceDescription = OtherSourceDescription;
    this.Unit = Unit;
    this.ExchangeRate = ExchangeRate;
    this.Remark = Remark;
  }
}
