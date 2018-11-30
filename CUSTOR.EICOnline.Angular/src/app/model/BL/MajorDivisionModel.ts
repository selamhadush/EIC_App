export class MajorDivisionModel {
  public Id: number;
  public Description: string;
  public EnglishDescription: string;
  public MajorDivTigrigna: string;
  public MajorDivAfanOromo: string;
  public MajorDivAfar: string;
  public MajorDivSomali: string;
  public MajorDivArabic: string;
  public DescriptionSort: string;
  public  DescriptionSoundX: string;
  public  Code: string;
  constructor(Id: number , Description: string,
              EnglishDescription: string, MajorDivTigrigna: string,
              MajorDivAfanOromo: string, MajorDivAfar: string,
              MajorDivSomali: string, MajorDivArabic: string,
              DescriptionSort: string, DescriptionSoundX: string,
              Code: string) {
    this.Id = Id;
    this.Description = Description;
    this.EnglishDescription = EnglishDescription;
    this.MajorDivTigrigna = MajorDivTigrigna;
    this.MajorDivAfanOromo = MajorDivAfanOromo;
    this.MajorDivAfar = MajorDivAfar;
    this.MajorDivSomali = MajorDivSomali;
    this.MajorDivArabic = MajorDivArabic;
    this.DescriptionSort = DescriptionSort;
    this.DescriptionSoundX = DescriptionSoundX;
  }
}
