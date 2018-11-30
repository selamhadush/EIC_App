export class ProjectImplementationPlan {
  public ProjectImplementationPlanId: number;
  // ProjectId	integer($int32)
  public StartDate: string;
  public CompletionDate: string;
  public FeasibilityStudy: string; // ($date-time)
  public LandAcquisition: string; // ($date-time)
  public CivilWorks: string;  // ($date-time)
  public Electricity: string;  // ($date-time)
  public Water: string;        // ($date-time)
  public Telecom: string;   // ($date-time)
  public OtherUtility: string; // ($date-time)
  public MachineryProcurement: string; // ($date-time)
  public MachineryInstallation: string; // ($date-time)
  public RawMaterialPreparation: string; // ($date-time)
  public MachineryTesting: string;  // ($date-time)
  public OtherTasks: string;    // ($date-time)
  public OtherTasksDescription: string;
  public ProjectCommissioning: string;    // ($date-time)
  public Remark: string;
}