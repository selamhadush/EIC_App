export class SubSectorModel {
  SubSectorId: string;
  ParentId: string;
  SectorId: string;
  Description: string;
  DescriptionEnglish: string;
  DescriptionEnglishAlias: string;

  constructor(SubSectorId: string, ParentId: string, SectorId: string, Description: string, DescriptionEnglish: string, DescriptionEnglishAlias: string) {
    this.SubSectorId = SubSectorId;
    this.ParentId = ParentId;
    this.SectorId = SectorId;
    this.Description = Description;
    this.DescriptionEnglish = DescriptionEnglish;
    this.DescriptionEnglishAlias = DescriptionEnglishAlias;
  }
}