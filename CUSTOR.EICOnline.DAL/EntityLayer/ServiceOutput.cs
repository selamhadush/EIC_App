using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ServiceOutput
  {
    public int ServiceOutputId { get; set; }
    public int ServiceApplicationWorkflowId { get; set; }
    public DateTime IssuedDate { get; set; }
    public string LetterNo { get; set; }
    public string From { get; set; }
    public string To { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public bool IsDelivered { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    //public ServiceApplicationWorkflow ServiceApplicationWorkflow { get; set; }
  }
}