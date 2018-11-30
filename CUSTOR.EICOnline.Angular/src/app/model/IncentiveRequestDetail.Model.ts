export class IncentiveRequestDetailModel {
  /*[Key]*/
  public IncentiveRequestDetailId: number;
  public IncentiveRequestId: number;
  public ProjectId?: any;
  public IncentiveItemId: number;
  public IncentiveCategoryId: number;
  public Amount: number;
  public Description: string;
  public Quantity: number;
  public ApprovedQty: number;
  public MotorNo?: string;
  public ChassisNo?: string;
  public Balance: number;
  public CurrencyType: number;
  public CurrencyRate: number;
  public MeasurementUnit: string;
  public IsDeleted?: boolean;
  public IsApproved?: boolean;
  public EventDatetime?: Date;
  public CreatedUserId?: number;
  public CreatedUserName?: string;
  public UpdatedEventDatetime?: Date;
  public UpdatedUserId?: number;
  public UpdatedUserName?: string;
}
