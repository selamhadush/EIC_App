namespace EIC.Investment.API.ViewModels
{
  public partial class ServicePrerequisiteVM
  {
    public ServicePrerequisiteVM()
    {
    }

    public int ServicePrerequisiteId { get; set; }

    public string Description { get; set; }

    public string DescriptionEnglish { get; set; }

    public int ServiceId { get; set; }

    public bool IsActive { get; set; }

    public string ServiceNameEnglish { get; set; }
  }
}