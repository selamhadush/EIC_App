using System;

namespace Sample.EntityLayer
{
  public partial class ChangeLogExclusion : IEntity
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