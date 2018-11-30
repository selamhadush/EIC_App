export class TariffModel {
  public TariffId: number;
  public Name: string;
  public NameEnglish: string;
  public IsActive: boolean;
  public AccCode: string;
  public Fee: number;
  public TariffModeId: number;
  public IncrementalFee: number;
  public Quantity: number;
  public selected?: boolean ;

  constructor(tariffId?: number, isActive?: boolean, name?: string, nameEnglish?: string,
              accCode?: string, fee?: number, tariffModeId?: number, incrementalFee?: number, quantity?: number,
              selected?: boolean
  ) {
    this.TariffId = tariffId;
    this.Name = name;
    this.NameEnglish = nameEnglish;
    this.IsActive = isActive;
    this.AccCode = accCode;
    this.Fee = fee;
    this.TariffModeId = tariffModeId;
    this.IncrementalFee = incrementalFee;
    this.Quantity = quantity;
    this.selected = selected;
  }
}