using System;

namespace Sample.EntityLayer
{
  public interface IAuditEntity : IEntity
  {
    String CreationUser { get; set; }

    DateTime? CreationDateTime { get; set; }

    String LastUpdateUser { get; set; }

    DateTime? LastUpdateDateTime { get; set; }
  }
}