import {ProjectCostModel} from './ProjectCost.model';
import {ProjectEmploymentModel} from './ProjectEmployment.model';
import {ProjectOutputModel} from './ProjectOutput.model';
import {ProjectRequirementModel} from './ProjectRequirement.model';
import {ProjectNationalityCompositionModel} from './ProjectNationalityComposition.model.';
import {ProjectInputModel} from './ProjectInput.model';
import {ServiceApplicationModel} from './ServiceApplication.model';
import {InvActivityModel} from './invactivity';
import {Investor} from './investor';

export class ProjectModel {
  public ProjectId?: number;
  public InvestorId: number;
  public ProjectName: string;
  public ProjectDescription: string;
  public ServiceId: any;
  public StartDate: string;
  public OperationDate: string;
  public EndingDate: string;
  public SectorId: number;
  public SubSectorId: number;
  public ActivityId?: number;
  public InvActivityId?: number;
  public HasEnvironmentalImpact: boolean;
  public EnvironmentalImpact?: string;
  public FormOfInvestment: number;
  public FormOfOwnership: number;
  public ReportingPeriod: number;
  public SiteId: number;
  public InvestmentPermitNo?: any;
  public IsOromiaSpecialZone: boolean;
  public IsActive: boolean;
  public CreatedUserName: string;
  public BusinessLicenseNo: string;
  public ProjectStage: number;
  public ProjectStatus: number;
  public ProjectCost?: ProjectCostModel;
  public ProjectEmployment?: ProjectEmploymentModel;
  public ProjectOutput?: ProjectOutputModel[];
  public ProjectRequirement?: ProjectRequirementModel;
  public ProjectNationalityComposition?: ProjectNationalityCompositionModel[];
  public ProjectInput?: ProjectInputModel[];
  public InvestmentActivity?: InvActivityModel;
  public ServiceApplication?: ServiceApplicationModel[];
  public Investor?: Investor;

  constructor(ProjectId: number, ProjectName: string,
              ProjectDescription: string, StartDate: string, OperationDate: string,
              EndingDate: string, SectorId: number, SubSectorId: number,
              HasEnvironmentalImpact: boolean, EnvironmentalImpact: string,
              FormOfInvestment: number, FormOfOwnership: number, ReportingPeriod: number,
              SiteId: number, ProjectCost: ProjectCostModel,
              ProjectEmployment: ProjectEmploymentModel, ProjectOutput: ProjectOutputModel[],
              ProjectRequirement: ProjectRequirementModel,
              ProjectNationalityComposition: ProjectNationalityCompositionModel[],
              ProjectInput: ProjectInputModel[]) {
    this.ProjectId = ProjectId;
    this.ProjectName = ProjectName;
    this.ProjectDescription = ProjectDescription;
    this.StartDate = StartDate;
    this.OperationDate = OperationDate;
    this.EndingDate = EndingDate;
    this.SectorId = SectorId;
    this.SubSectorId = SubSectorId;
    this.HasEnvironmentalImpact = HasEnvironmentalImpact;
    this.EnvironmentalImpact = EnvironmentalImpact;
    this.FormOfInvestment = FormOfInvestment;
    this.FormOfOwnership = FormOfOwnership;
    this.ReportingPeriod = ReportingPeriod;
    this.SiteId = SiteId;
    this.ProjectCost = ProjectCost;
    this.ProjectEmployment = ProjectEmployment;
    this.ProjectOutput = ProjectOutput;
    this.ProjectRequirement = ProjectRequirement;
    this.ProjectNationalityComposition = ProjectNationalityComposition;
    this.ProjectInput = ProjectInput;
  }
}
