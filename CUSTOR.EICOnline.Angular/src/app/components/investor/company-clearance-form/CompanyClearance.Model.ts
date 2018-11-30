export class CompanyClearanceModel {
  /*[Key]
[DatabaseGenerated(DatabaseGeneratedOption.Identity)]*/
  public CompanyClearanceId: number;
  public CompanyNameOneEnglish: string;
  public CompanyNameOneAmharic: string;
  public CompanyNameTwoEnglish: string;
  public CompanyNameTwoAmharic: string;
  public CompanyNameThreeEnglish: string;
  public CompanyNameThreeAmharic: string;
  public IsActive: boolean;
  public IsDeleted: boolean;
  public CreatedDate: Date;
  public CreatedBy: string;
  public UpdatedDate: Date;
  public UpdatedBy: string;
}
