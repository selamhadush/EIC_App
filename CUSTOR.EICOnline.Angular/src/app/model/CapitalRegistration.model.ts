import {ProjectModel} from './project.model';

export class CapitalRegistrationModel {
  public CapitalRegistrationId: number;
  public ProjectId: number;
  public IsActual: boolean;
  public AdviceReferenceNumber: number;
  public ActualCostInForeign: number;
  public Unit: number;
  public ExchangeRate: number;
  public Remark: string;
  public IsActive: boolean;
  public IsDeleted: boolean;
  public EventDatetime: Date;
  public CreatedUserId: number;
  public ProjectStatus: number;
  public CreatedUserName: string;
  public UpdatedEventDatetime: Date;
  public CapitalRegistrationDate: Date;
  public UpdatedUserId: number;
  public UpdatedUserName: string;
  public Project: ProjectModel;
}
