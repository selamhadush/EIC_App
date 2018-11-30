import { ZoneModel } from './Zone.model';

export class RegionModel {
  RegionId: string;
  Description: string;
  DescriptionEnglish: string;
  Zones?: ZoneModel[];

  constructor(RegionId: string, Description: string, DescriptionEnglish: string) {
    this.RegionId = RegionId;
    this.Description = Description;
    this.DescriptionEnglish = DescriptionEnglish;
  }
}
