export class SectorModel {
  SectorId: string;
  Description: string;
  DescriptionEnglish: string;
  EconomicSector: number;

  constructor(SectorId: string, Description: string, DescriptionEnglish: string, EconomicSector: number) {
    this.SectorId = SectorId;
    this.Description = Description;
    this.DescriptionEnglish = DescriptionEnglish;
    this.EconomicSector = EconomicSector;
  }
}