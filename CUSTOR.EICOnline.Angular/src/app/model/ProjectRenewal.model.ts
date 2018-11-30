import {ServiceApplicationModel} from './ServiceApplication.model';
import {ProjectModel} from './project.model';
import {SiteModel} from './Site.model';

export class ProjectRenewalModel {
  public ProjectRenewalId: number;
  public ProjectId: number;
  public ServiceApplicationId: number;
  public ServiceId: number;
  public InvestorId: number;
  public ProjectStatus: number;
  public RenewalDate: Date;
  public ExpectedStartDate: Date;
  public IsApproved: boolean;
  public ApprovedBy: number;
  public ApprovedDate?: Date;
  public RenewedFrom: Date;
  public RenewedTo: Date;
  public MajorProblems: string;
  public Remark: string;
  public SiteId: number;
  public IsActive: boolean;
  public IsDeleted: boolean;
  public EventDatetime: Date;
  public CreatedUserId: number;
  public CreatedUserName: string;
  public UpdatedEventDatetime: Date;
  public UpdatedUserId: number;
  public UpdatedUserName: string;
  public Project: ProjectModel;
  public ServiceApplication: ServiceApplicationModel;
  public Site: SiteModel;
}
