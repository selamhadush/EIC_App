export class ProjectRequirementModel {
  public ProjectRequirementId?: number;
  public ProjectId: number;
  public ElectricPower: number;
  public Water: number;
  public OtherUtility: number;
  public LandIndustrial: number;
  public LandAgricultural: number;
  public LandService: number;
  public OwnLand: number;
  public RentalLand: number;
  public LeaseLand: number;
  public Remark: string;
  public workFlowId?: number;
  public ProjectStatus?: number;
  public Quarter?: number;
  public RegistrationYear?: number;

  constructor(ProjectRequirementId: number, ProjectId: number,
              ElectricPower: number, Water: number, OtherUtility: number,
              LandIndustrial: number, LandAgricultural: number, LandService: number, Remark: string) {
    this.ProjectRequirementId = ProjectRequirementId;
    this.ProjectId = ProjectId;
    this.ElectricPower = ElectricPower;
    this.Water = Water;
    this.OtherUtility = OtherUtility;
    this.LandIndustrial = LandIndustrial;
    this.LandAgricultural = LandAgricultural;
    this.LandService = LandService;
    this.Remark = Remark;
  }
}
