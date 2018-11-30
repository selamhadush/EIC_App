export class TaxExemptionModel {
  public IncentiveTaxExemptionRequestID: number;
  public ProjectId?: any;
  public RequestDate: Date;
  public RequestBy?: string;
  public ExemptionYearRequested: number;
  public RevenueBranch: number;
  public RevenueBranchDescription: string;
  public EffectiveStartDate?: Date;
  public IsApproved?: boolean;
}
