using System;

namespace Sample.EntityLayer
{
  public partial class EventLog : IEntity
  {
    public EventLog()
    {
    }

    public EventLog(Guid? eventLogID)
    {
      EventLogID = eventLogID;
    }

    public Guid? EventLogID { get; set; }

    public Int32? EventType { get; set; }

    public String Key { get; set; }

    public String Message { get; set; }

    public DateTime? EntryDate { get; set; }
  }
}