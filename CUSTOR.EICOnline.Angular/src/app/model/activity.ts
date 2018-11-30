import { SubSectorModel } from './subSector';
import { SectorModel } from './sector';

export class ActivityModel {
  public SectorId: number;
  public SubSectorId: number;
  public ActivityId: number;
  public Description: string;
  public DescriptionAlias: string;
  public DescriptionEnglish: string;
  public DescriptionEnglishAlias: string;
  public SubSector: SubSectorModel;
  public Sector: SectorModel;

  constructor(ActivityId?: number, SubSectorId?: number, SectorId?: number, Description?: string, DescriptionAlias?: string, DescriptionEnglish?: string, DescriptionEnglishAlias?:
    string, SubSectorName?: SubSectorModel, SectorName?: SectorModel) {
    this.SectorId = SectorId;
    this.SubSectorId = SubSectorId;
    this.ActivityId = ActivityId;
    this.Description = Description;
    this.DescriptionAlias = DescriptionAlias;
    this.DescriptionEnglish = DescriptionEnglish;
    this.DescriptionEnglishAlias = DescriptionEnglishAlias;
    this.SubSector = SubSectorName;
    this.Sector = SectorName;
  }
}