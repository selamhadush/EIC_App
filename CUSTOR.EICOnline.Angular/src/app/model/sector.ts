export class SectorModel {
  public SectorId: number;
  public Description: string;
  public DescriptionAlias: string;
  public DescriptionEnglish: string;
  public DescriptionEnglishAlias: string;
  public EconomicSector: number;

  constructor(SectorId?: number, Description?: string, DescriptionAlias?: string, DescriptionEnglish?: string, DescriptionEnglishAlias?: string, EconomicSector?: number) {
    this.SectorId = SectorId;
    this.Description = Description;
    this.DescriptionAlias = DescriptionAlias;
    this.DescriptionEnglish = DescriptionEnglish;
    this.DescriptionEnglishAlias = DescriptionEnglishAlias;
    this.EconomicSector = EconomicSector;
  }
}