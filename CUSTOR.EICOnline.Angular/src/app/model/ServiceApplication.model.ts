import {ServiceWorkflowModel} from './ServiceWorkflow.model';
import {ServiceModel} from './Service.model';
import {Investor} from './investor';
import {ProjectModel} from './project.model';
import {ProjectCancellationModel} from './project/ProjectCancellation.model';
import {ProjectRenewalModel} from './ProjectRenewal.model';
import {ServiceWorkflowHistoriesModel} from './ServiceWorkflowHistories.Model';
import {ProjectSubstituteModel} from './ProjectSubstitute.model';
import {IncentiveBoMRequestItemModel} from './incentive/IncentiveBoMRequestItem.model';
import {TodoTaskModel} from './TodoTask.model';

export class ServiceApplicationModel {
  public ServiceApplicationId: string;
  public ProjectId: string;
  public InvestorId: string;
  public ServiceId: any;
  public TodoTaskId: string;
  public CaseNumber: string;
  public StartDate: string;

  public ServiceNameEnglish: string;
  public ServiceNameAmharic: string;

  public InvestorNameEnglish: string;
  public InvestorNameAmharic: string;

  public ProjectNameAmharic: string;
  public ProjectNameEnglish: string;

  public IsSelfService?: boolean;
  public EndDate: string;
  public IsActive?: any;
  public IsPaid?: boolean;
  public CreatedUserId?: any;
  public CurrentStatusId?: number;
  public ServiceWorkflow?: ServiceWorkflowModel;
  public serviceWorkflowHistories?: ServiceWorkflowHistoriesModel;
  public Service?: ServiceModel;
  public Investor?: Investor;
  public Project?: ProjectModel;

  public ProjectCancellation?: ProjectCancellationModel[];
  public ProjectRenewal?: ProjectRenewalModel[];
  public ProjectSubstitute?: ProjectSubstituteModel[];
  public IncentiveBoMRequestItem?: IncentiveBoMRequestItemModel[];
  public todoTask?: TodoTaskModel;


  constructor(ServiceApplicationId?: string, ProjectId?: string,
              InvestorId?: string, ServiceId?: string, CaseNumber?: string,
              StartDate?: string, EndDate?: string, CurrentStatusId?: number) {
    this.ServiceApplicationId = ServiceApplicationId;
    this.ProjectId = ProjectId;
    this.InvestorId = InvestorId;
    this.ServiceId = ServiceId;
    this.CaseNumber = CaseNumber;
    this.StartDate = StartDate;
    this.EndDate = EndDate;
    this.CurrentStatusId = CurrentStatusId;
  }
}
