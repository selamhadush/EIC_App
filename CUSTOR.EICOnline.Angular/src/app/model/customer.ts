export class Customer {
  constructor(id?: number, isCompany?: boolean, title?: string, firstName?: string, fatherName?: string,
    grandName?: string, nationality?: string, maritalStatus?: number, gender?: number, region?: string,
    zone?: string, woreda?: string, kebele?: string, birthDate?: Date) {
    this.CustomerId = id;
    this.IsCompany = isCompany;
    this.Title = title;
    this.FirstName = firstName;
    this.FatherName = fatherName;
    this.GrandName = grandName;
    this.Nationality = nationality;
    this.MaritalStatus = maritalStatus;
    this.Gender = gender;
    this.Region = region;
    this.Zone = zone;
    this.Woreda = woreda;
    this.Kebele = kebele;
    this.BirthDate = birthDate;
  }
  public CustomerId: number;
  public IsCompany: boolean;
  public Title: string;
  public FirstName: string;
  public FatherName: string;
  public GrandName: string;
  public Nationality: string;
  public MaritalStatus: number;
  public Gender: number;
  public Region: string;
  public Zone: string;
  public Woreda: string;
  public Kebele: string;
  public BirthDate: string | Date;
}