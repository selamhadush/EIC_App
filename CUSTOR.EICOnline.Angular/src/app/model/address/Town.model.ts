export class TownModel {
  TownId: string;
  RegionId: string;
  Description: string;
  DescriptionEnglish: string;

  constructor(TownId: string, RegionId: string, Description: string, DescriptionEnglish: string) {
    this.TownId = TownId;
    this.RegionId = RegionId;
    this.Description = Description;
    this.DescriptionEnglish = DescriptionEnglish;
  }
}