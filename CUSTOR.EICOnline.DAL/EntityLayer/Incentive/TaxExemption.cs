using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  [Table(name: "Incentive_TaxExemptionRequest")]
  public partial class IncentiveTaxExemptionRequest
  {
    public IncentiveTaxExemptionRequest()
    {
      //IncentiveRequestItemReconciliation = new HashSet<IncentiveRequestItemReconciliation>();
    }
    [Key]
    public int IncentiveTaxExemptionRequestID { get; set; }
    public int ProjectId { get; set; }
    public int? IncentiveRequestId { get; set; }
    public int ExemptionYearRequested { get; set; }
    public int RevenueBranch { get; set; }
    public string RevenueBranchDescription { get; set; }
    public DateTime RequestDate { get; set; }

  }
}
