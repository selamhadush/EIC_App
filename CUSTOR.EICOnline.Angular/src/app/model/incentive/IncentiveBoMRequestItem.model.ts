import { ServiceApplicationModel } from 'app/model/ServiceApplication.model';

export class IncentiveBoMRequestItemModel {
  constructor() {

  }

  public IncentiveBoMRequestItemId: number;
  public ServiceApplicationId: number;
  public IncentiveRequestId: number;
  public ProjectId: number;
  public IncentiveCategoryId: number;
  public Description: string;
  public HsCode: string;
  public Quantity: number;
  public MesurmentUnit: string;
  public IsApproved: Boolean;
  public IsDeleted: Boolean;
  public ApprovedQuantity?: number;
  public Balance?: number;
  public EventDatetime?: Date;
  public CreatedUserId: number;
  public UpdatedUserId?: number;
  public CreatedUserName?: string;
  public UpdatedUserName?: string;
  public ServiceApplication: ServiceApplicationModel;
}
