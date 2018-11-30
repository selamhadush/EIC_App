import { KebeleModel } from './Kebele.model';

export class WoredaModel {
  WoredaId: string;
  ZoneId: string;
  Description: string;
  DescriptionEnglish: string;
  Kebeles?: KebeleModel[];

  constructor(WoredaId: string, ZoneId: string, Description: string, DescriptionEnglish: string) {
    this.WoredaId = WoredaId;
    this.ZoneId = ZoneId;
    this.Description = Description;
    this.DescriptionEnglish = DescriptionEnglish;
  }
}