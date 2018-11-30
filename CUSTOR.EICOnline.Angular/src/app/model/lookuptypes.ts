export class LookuptypesModel {
  public LookUpTypeId?: number;
  public Description: string;
  public DescriptionEnglish: string;

  constructor(LookUpTypeId?: number,Description?: string, DescriptionEnglish?: string, ) {
    this.LookUpTypeId = LookUpTypeId;
    this.Description = Description;
    this.DescriptionEnglish = DescriptionEnglish;
  }
}
