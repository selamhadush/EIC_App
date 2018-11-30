export class ServiceWorkflowHistoriesModel {
  constructor() {
  }

  public ServiceWorkflowHistoryId: number;
  public ServiceApplicationId: number;
  public StepId: number;
  public ActionId: number;
  public FromStatusId: number;
  public ToStatusId: number;
  public PerformedByRoleId: number;
  public NextStepId: number;
  public GenerateEmail: boolean;
  public GenerateLetter: boolean;
  public IsDocumentRequired: boolean;
  public ServiceId: number;
  public LegalStatusId: number;
  public IsActive: boolean;
  public IsDeleted: boolean;
  public EventDatetime: Date;
  public CreatedUserId: number;
  public CreatedUserName: string;
  public UpdatedEventDatetime: Date;
  public UpdatedUserId: number;
  public UpdatedUserName: string;

}
