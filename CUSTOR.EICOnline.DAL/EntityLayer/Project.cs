using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class Project
  {
    public Project()
    {

      ProjectAssociate = new HashSet<ProjectAssociate>();
      ProjectCancellation = new HashSet<ProjectCancellation>();
      ProjectSubstitute = new HashSet<ProjectSubstitute>();
      ProjectCost = new HashSet<ProjectCost>();
      CapitalRegistrations = new HashSet<CapitalRegistration>();
      ProjectEmployment = new HashSet<ProjectEmployment>();
      ProjectImplementationPlan = new HashSet<ProjectImplementationPlan>();
      ProjectInput = new HashSet<ProjectInput>();
      ProjectNationalityComposition = new HashSet<ProjectNationalityComposition>();
      ProjectOutput = new HashSet<ProjectOutput>();
      ProjectRenewal = new HashSet<ProjectRenewal>();
      ProjectRequirement = new HashSet<ProjectRequirement>();
      ServiceApplication = new HashSet<ServiceApplication>();
    }

    public int ProjectId { get; set; }
    public int InvestorId { get; set; }
    public int? ParentProjectId { get; set; }
    public string ProjectName { get; set; }
    public string ProjectNameSort { get; set; }
    public string ProjectNameSoundX { get; set; }
    public string ProjectDescription { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime OperationDate { get; set; }
    public DateTime TerminationDate { get; set; }
    public int ProjectStatus { get; set; }
    public int? ProjectStage { get; set; }

    public int SectorId { get; set; }
    public int ActivityId { get; set; }
    public int SubSectorId { get; set; }
    public int InvActivityId { get; set; }

    public int InvestmentType { get; set; }
    public string InvestmentPermitNo { get; set; }
    public string InvestmentPermitNoSort { get; set; }
    public string InvestmentPermitNoSoundX { get; set; }
    public string PermitIssuedDate { get; set; }
    public string PreviousInvestmentPermitNo { get; set; }
    public DateTime PreviousPermitIssuedDate { get; set; }
    public DateTime PermitExpirationDate { get; set; }
    public bool HasBusinessLicense { get; set; }
    public string BusinessLicenseNo { get; set; }
    public DateTime BusinessLicenseStartDate { get; set; }
    public bool HasEnvironmentalImpact { get; set; }
    public string EnvironmentalImpact { get; set; }
    public int FormOfInvestment { get; set; }
    public DateTime? EndingDate { get; set; }

    public int ReportingPeriod { get; set; }
    public int SiteId { get; set; }
    public string InvestmentLocation { get; set; }
    public int InvestmentLocationCategory { get; set; }
    public decimal AnnualProductionValue { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    [NotMapped]
    public int? ServiceId { get; set; }

    public bool IsOromiaSpecialZone { get; set; }
    public Investor Investor { get; set; }
    public Sector sector { get; set; }
    public Activity Activity { get; set; }
    public InvestmentActivity InvestmentActivity { get; set; }
    public Site Site { get; set; }
    public SubSector SubSector { get; set; }

    public ICollection<ProjectAssociate> ProjectAssociate { get; set; }
    public ICollection<ProjectCancellation> ProjectCancellation { get; set; }
    public ICollection<ProjectSubstitute> ProjectSubstitute { get; set; }
    public ICollection<ProjectCost> ProjectCost { get; set; }
    public ICollection<CapitalRegistration> CapitalRegistrations { get; set; }
    public ICollection<ProjectEmployment> ProjectEmployment { get; set; }
    public ICollection<ProjectImplementationPlan> ProjectImplementationPlan { get; set; }
    public ICollection<ProjectInput> ProjectInput { get; set; }
    public ICollection<ProjectNationalityComposition> ProjectNationalityComposition { get; set; }
    public ICollection<ProjectOutput> ProjectOutput { get; set; }
    public ICollection<ProjectRenewal> ProjectRenewal { get; set; }
    public ICollection<ProjectRequirement> ProjectRequirement { get; set; }
    public ICollection<ServiceApplication> ServiceApplication { get; set; }
  }

  public class ProjectLookUp
  {
    public ProjectLookUp()
    {
    }

    public int ProjectId { get; set; }
    public int InvestorId { get; set; }
    public string ProjectName { get; set; }
    public string ProjectNameSort { get; set; }
    public string ProjectNameSoundX { get; set; }
    public string ProjectDescription { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime OperationDate { get; set; }
    public DateTime TerminationDate { get; set; }
    public DateTime? EndingDate { get; set; }
    public int ProjectStatus { get; set; }
    public int ProjectStage { get; set; }
    public int? FormOfOwnership { get; set; }
    public int SectorId { get; set; }
    public string SectorId1 { get; set; }
    public int SubSectorId { get; set; }
    public string SubSectorId1 { get; set; }
    public int InvestmentType { get; set; }
    public string InvestmentPermitNo { get; set; }
    public string InvestmentPermitNoSort { get; set; }
    public string InvestmentPermitNoSoundX { get; set; }
    public string PermitIssuedDate { get; set; }
    public string PreviousInvestmentPermitNo { get; set; }
    public DateTime PreviousPermitIssuedDate { get; set; }
    public DateTime PermitExpirationDate { get; set; }
    public bool HasBusinessLicense { get; set; }
    public string BusinessLicenseNo { get; set; }
    public bool IsOromiaSpecialZone { get; set; }

  }
}