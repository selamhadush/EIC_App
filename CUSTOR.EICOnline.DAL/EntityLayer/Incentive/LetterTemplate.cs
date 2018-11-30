using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public class LetterTemplate
  {
    public int LetterTemplateId { get; set; }
    public int LetterType { get; set; }
    public string ToOrg { get; set; }
    public string Title { get; set; }
    public string CC { get; set; }
    public string LetterContent { get; set; }
    public Boolean? IsActive { get; set; }
  }
}
