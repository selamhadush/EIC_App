export class DivisionModel {
  public Id: number;
  public Description: string;
  public EnglishDescription: string;
  public DivisionTigrigna: string;
  public DivisionAfanOromo: string;
  public DivisionAfar: string;
  public DivisionSomali: string;
  public DivisionArabic: string;
  public DescriptionSort: string;
  public  DescriptionSoundX: string;
  public  Code: string;
  public  Parent: number;
  constructor(Id: number , Description: string,
              EnglishDescription: string, DivisionTigrigna: string,
              DivisionAfanOromo: string, DivisionAfar: string,
              DivisionSomali: string, DivisionArabic: string,
              DescriptionSort: string, DescriptionSoundX: string,
              Code: string,
              Parent: number) {
    this.Id = Id;
    this.Description = Description;
    this.EnglishDescription = EnglishDescription;
    this.DivisionTigrigna = DivisionTigrigna;
    this.DivisionAfanOromo = DivisionAfanOromo;
    this.DivisionAfar = DivisionAfar;
    this.DivisionSomali = DivisionSomali;
    this.DivisionArabic = DivisionArabic;
    this.DescriptionSort = DescriptionSort;
    this.DescriptionSoundX = DescriptionSoundX;
    this.Parent = Parent;
  }
}
