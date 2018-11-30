export class KebeleModel {
  KebeleId: string;
  WoredaId: string;
  Description: string;
  DescriptionEnglish: string;

  constructor(KebeleId: string, WoredaId: string, Description: string, DescriptionEnglish: string) {
    this.KebeleId = KebeleId;
    this.WoredaId = WoredaId;
    this.Description = Description;
    this.DescriptionEnglish = DescriptionEnglish;
  }
}