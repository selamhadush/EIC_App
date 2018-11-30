import {ServiceApplicationModel} from './ServiceApplication.model';

export class TodoTaskModel {
  constructor() {

  }

  public TodoTaskId: number;
  public ServiceApplicationId: string;
  public AssignedDate: any;
  public EndDate: Date;
  public CurrentStatusId: number;
  public AssignedUserId: string;
  public Remark: string;
  public IsActive: boolean;
  public IsDeleted: boolean;
  public EventDatetime: Date;
  public CreatedUserId: any;
  public CreatedUserName: string;
  public UpdatedEventDatetime: Date;
  public UpdatedUserId: number;
  public UpdatedUserName: string;
  public ServiceApplication: ServiceApplicationModel[];
}
