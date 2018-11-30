import {SectorModel} from './sector';

export class SubSectorModel {
  public SubSectorId: number;
  public SectorId: number;
  public Description: string;
  public DescriptionAlias: string;
  public DescriptionEnglish: string;
  public DescriptionEnglishAlias: string;
  public Sector: SectorModel;

  constructor(SubSectorId?: number, SectorId?: number, Description?: string, DescriptionAlias?: string, DescriptionEnglish?: string, DescriptionEnglishAlias?:
    string, SectorName?: SectorModel) {
    this.SubSectorId = SubSectorId;
    this.SectorId = SectorId;
    this.Description = Description;
    this.DescriptionAlias = DescriptionAlias;
    this.DescriptionEnglish = DescriptionEnglish;
    this.DescriptionEnglishAlias = DescriptionEnglishAlias;
    this.Sector = SectorName;
  }
}