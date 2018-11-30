namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public class IncentiveLog
  {


    public int IncentiveLogId { get; set; }
    public string InvestorId { get; set; }
    public string ServiceId { get; set; }
    public string ProjectId { get; set; }
    public string IncentiveType { get; set; }
    public string UserId { get; set; }
    public string UserType { get; set; }
    public string SiteId { get; set; }
  }
}
