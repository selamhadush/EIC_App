using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class LetterTemplateValue
  {
    public int LetterTemplateValueId { get; set; }
    public int LetterTemplateId { get; set; }
    public string Tag { get; set; }
    public string TableName { get; set; }
    public string ColumnName { get; set; }
    public string CriteriaColumnName { get; set; }
    public bool IsString { get; set; }
    public string Remark { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public LetterTemplate LetterTemplate { get; set; }
  }
}