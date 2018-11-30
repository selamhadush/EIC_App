export class RegionModel {
  public RegionId: number;
  public Description: string;
  public DescriptionEnglish: string;

  constructor(RegionId?: number, Description?: string, DescriptionEnglish?: string) {
    this.RegionId = RegionId;
    this.Description = Description;
    this.DescriptionEnglish = DescriptionEnglish;
  }
}