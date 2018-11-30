import {ProjectModel} from './project.model';
import {ServiceApplicationModel} from './ServiceApplication.model';

export class ProjectSubstituteModel {
  public ProjectSubstituteId: number;
  public ProjectId: number;
  public ServiceApplicationId: number;
  /*[NotMapped]*/
  public InvestorId: number;
  public Reason: number;
  public SubstituteRemark: string;
  public IsActive: boolean;
  public IsDeleted: boolean;
  public EventDatetime: Date;
  public CreatedUserId: number;
  public CreatedUserName: string;
  public UpdatedEventDatetime: Date;
  public UpdatedUserId: number;
  public UpdatedUserName: string;
  /*[NotMapped]*/
  public ServiceId: number;
  public Project: ProjectModel;
  public ServiceApplication: ServiceApplicationModel;
}
