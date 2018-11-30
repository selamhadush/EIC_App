export class SiteModel {
  SiteId?: number;
  Name: string;
  NameEnglish: string;
  IsActive: boolean;
  SiteCode?: string;

  constructor(SiteId?: number, Name?: string, NameEnglish?: string, IsActive?: boolean, SiteCode?: string) {
    this.SiteId = SiteId;
    this.Name = Name;
    this.NameEnglish = NameEnglish;
    this.IsActive = IsActive;
    this.SiteCode = SiteCode;
  }
}
