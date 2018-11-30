export class LookupsModel {
  public LookupId: number;
  public LookUpTypeId: number;
  public Amharic: string;
  public English: string;
  public DescriptionEnglish: string;

  constructor(LookupId?: number, LookUpTypeId?: number, Amharic?: string, English?: string, DescriptionEnglish?: string) {
    this.LookupId = LookupId;
    this.LookUpTypeId = LookUpTypeId;
    this.Amharic = Amharic;
    this.English = English;
    this.DescriptionEnglish = DescriptionEnglish;
  }
}
