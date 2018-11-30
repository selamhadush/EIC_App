import {AssociateModel} from './associate.model';
import {ProjectModel} from './project.model';

export class ProjectAssociateModel {
  public ProjectAssociateId: number;
  public ProjectId: number;
  public AssociateId: number;
  // public Postion?: number;
  public Status: number;
  public IsActive: boolean;
  public IsDeleted: boolean;
  public EventDatetime: Date;
  public CreatedUserId: number;
  public CreatedUserName: string;
  public UpdatedEventDatetime: Date;
  public UpdatedUserId: number;
  public UpdatedUserName: string;
  public Associate: AssociateModel;
  public Project: ProjectModel;
}
