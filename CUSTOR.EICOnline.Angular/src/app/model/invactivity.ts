import {SubSectorModel} from './subSector';
import {SectorModel} from './sector';
import {ActivityModel} from './activity';

export class InvActivityModel {
  public SectorId: number;
  public SubSectorId: number;
  public ActivityId: number;
  public InvActivityId: number;
  public Code?: any;
  public Description: string;
  public DescriptionAlias: string;
  public DescriptionEnglish: string;
  public DescriptionEnglishAlias: string;
  public InAddisOromiaAreas: number;
  public InOtherAreas: number;
  public SubSector: SubSectorModel;
  public Sector: SectorModel;
  public Activity: ActivityModel;

  constructor(InvActivityId?: number, ActivityId?: number, SubSectorId?: number, SectorId?: number,
              Description?: string, DescriptionAlias?: string, DescriptionEnglish?: string,
              DescriptionEnglishAlias?: string, InAddisOromiaAreas?: number, InOtherAreas?: number, SubSectorName?: SubSectorModel, SectorName?: SectorModel, ActivityName?: ActivityModel) {
    this.SectorId = SectorId;
    this.SubSectorId = SubSectorId;
    this.ActivityId = ActivityId;
    this.InvActivityId = InvActivityId;
    this.Description = Description;
    this.DescriptionAlias = DescriptionAlias;
    this.DescriptionEnglish = DescriptionEnglish;
    this.DescriptionEnglishAlias = DescriptionEnglishAlias;
    this.InAddisOromiaAreas = InAddisOromiaAreas;
    this.InOtherAreas = InOtherAreas;
    this.SubSector = SubSectorName;
    this.Sector = SectorName;
    this.Activity = ActivityName;
  }
}
