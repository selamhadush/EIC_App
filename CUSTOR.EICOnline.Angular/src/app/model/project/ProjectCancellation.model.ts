export class ProjectCancellationModel {
  public ProjectCancellationId: number;
  public ProjectId: number;
  public ServiceApplicationId: number;
  public InvestorId: number;
  public CancellationType: number;
  public CancellationLetterNo: string;
  public CancellationDate: Date;
  public CancellationReason: string;
  public ApprovedBy: number;
  public ApprovedDate: Date;
  public CancellationRemark: string;
  public IsActive: boolean;
  public IsDeleted: boolean;
  public EventDatetime: Date;
  public CreatedUserId: number;
  public CreatedUserName: string;
  public UpdatedEventDatetime: Date;
  public UpdatedUserId: number;
  public UpdatedUserName: string;
}
