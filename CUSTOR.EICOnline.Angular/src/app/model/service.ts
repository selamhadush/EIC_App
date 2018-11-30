export class ServicePrerequisiteModel {
  constructor(serviceId?: number, isActive?: boolean, Name?: string, NameEnglish?: string,
              DisplayName?: string, DisplayNameEnglish?: string) {
    this.ServiceId = serviceId;
    this.Name = Name;
    this.DisplayName = DisplayName;
    this.NameEnglish = NameEnglish;
    this.DisplayNameEnglish = DisplayNameEnglish;
    this.IsActive = isActive;
  }

  public ServiceId: number;
  public Name: string;
  public NameEnglish: string;
  public DisplayName: string;
  public DisplayNameEnglish: string;
  public IsActive: boolean;
}