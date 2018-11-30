import {WoredaModel} from './Woreda.model';

export class ZoneModel {
  ZoneId: string;
  RegionId: string;
  Description: string;
  DescriptionEnglish: string;
  Woredas?: WoredaModel[];

  constructor(ZoneId: string, RegionId: string, Description: string, DescriptionEnglish: string) {
    this.ZoneId = ZoneId;
    this.RegionId = RegionId;
    this.Description = Description;
    this.DescriptionEnglish = DescriptionEnglish;
  }
}