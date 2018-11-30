using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class Service
  {
    public Service()
    {
      ServiceApplication = new HashSet<ServiceApplication>();
      ServiceSite = new HashSet<ServiceSite>();
      ServiceStep = new HashSet<ServiceStep>();
      ServiceTariff = new HashSet<ServiceTariff>();
      ServiceWorkflow = new HashSet<ServiceWorkflow>();
      ServicePrerequisites = new HashSet<ServicePrerequisite>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ServiceId { get; set; }

    public string Name { get; set; }
    public string NameEnglish { get; set; }
    public string DisplayName { get; set; }
    public string DisplayNameEnglish { get; set; }
    public string Abbreviation { get; set; }
    public string Icon { get; set; }
    public int? Duration { get; set; }
    public int? DurationUnitId { get; set; }
    public bool? IsActive { get; set; }
    public bool? IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int? CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string TypeOfService { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public Lookup DurationUnit { get; set; }
    public ICollection<ServiceApplication> ServiceApplication { get; set; }
    public ICollection<ServicePrerequisite> ServicePrerequisites { get; set; }
    public ICollection<ServiceSite> ServiceSite { get; set; }
    public ICollection<ServiceStep> ServiceStep { get; set; }
    public ICollection<ServiceTariff> ServiceTariff { get; set; }
    public ICollection<ServiceWorkflow> ServiceWorkflow { get; set; }
  }

  public partial class ServicesLookup
  {
    public ServicesLookup()
    {
    }

    [Key]
    public int? ServiceId { get; set; }

    public string ServiceName { get; set; }
    public string ServiceNameEnglish { get; set; }
    //public bool IsActive { get; set; }
  }
}