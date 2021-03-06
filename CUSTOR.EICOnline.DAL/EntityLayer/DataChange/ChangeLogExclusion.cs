using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ChangeLogExclusion
  {
    public ChangeLogExclusion()
    {
    }

    public ChangeLogExclusion(Int32? changeLogExclusionID)
    {
      ChangeLogExclusionID = changeLogExclusionID;
    }

    public Int32? ChangeLogExclusionID { get; set; }

    public String EntityName { get; set; }

    public String PropertyName { get; set; }
  }
}