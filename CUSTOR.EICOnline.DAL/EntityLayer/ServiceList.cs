using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

//redundent class - to be removed/merged
namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ServiceList
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? ServiceId { get; set; }

    public string Name { get; set; }
    public string NameEnglish { get; set; }
    public string DisplayName { get; set; }
    public string DisplayNameEnglish { get; set; }
    public string Abbreviation { get; set; }
    public string Icon { get; set; }
    public int Duration { get; set; }
    public int DurationUnitId { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? CreatedDate { get; set; }
    public string CreatedBy { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public string UpdatedBy { get; set; }
    public Guid ObjectId { get; set; }
  }
}