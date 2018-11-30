using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CUSTOR.EICOnline.DAL.EntityLayer;

namespace CUSTOR.EICOnline.DAL
{
  public partial class ServicePrerequisite
  {
    public ServicePrerequisite()
    {
      Document = new HashSet<Document>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ServicePrerequisiteId { get; set; }

    public string Description { get; set; }

    public string DescriptionEnglish { get; set; }

    public int ServiceId { get; set; }

    public int BusinessType { get; set; }

    public bool IsActive { get; set; }
    public bool IsDocument { get; set; }

    [NotMapped]
    public string ServiceNameEnglish { get; set; }

    [ForeignKey(name: "ServiceId")]
    public Service Service { get; set; }

    public ICollection<Document> Document { get; set; }
  }

  public partial class ServicePrerequisiteLookup
  {
    public ServicePrerequisiteLookup()
    {
    }

    public int? ServicePrerequisiteId { get; set; }

    public string Description { get; set; }

    public string DescriptionEnglish { get; set; }

    public int ServiceId { get; set; }

    public int BusinessType { get; set; }
    public bool IsActive { get; set; }

    [NotMapped]
    public string ServiceNameEnglish { get; set; }

    public Service Service { get; set; }
    public ICollection<Document> Documents { get; set; }
  }
}