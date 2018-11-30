export class ServicePrerequisite {
  public ServicePrerequisiteId: number;
  public DocumentId?: number;
  public IsDocument?: number;
  public IsActive: boolean;
  public ServiceId: number;
  public Description: string;
  public BusinessType: number;
  public DescriptionEnglish: string;
  public ServiceNameEnglish: string;
  public upload?: boolean;
  public URL?: string;

  constructor(servicePrerequisiteId?: number, isActive?: boolean, description?: string, DescriptionEnglish?: string, serviceId?: number, ServiceNameEnglish?: string, BusinessType?: number) {
    this.ServicePrerequisiteId = servicePrerequisiteId;
    this.ServiceId = serviceId;
    this.Description = description;
    this.DescriptionEnglish = DescriptionEnglish;
    this.IsActive = isActive;
    this.ServiceNameEnglish = ServiceNameEnglish;
    this.BusinessType = BusinessType;
  }

  // public ServiceNameEnglish: string;
}
