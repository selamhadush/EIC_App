import {WoredaModel} from './Woreda.model';
import {ZoneModel} from './Zone.model';
import {RegionModel} from './Region.model';
import {KebeleModel} from './Kebele.model';

export class AddressModel {
  public AddressId?: number;
  public ParentId?: number;
  public AddressType?: number;
  public IsMainOffice?: boolean;
  public SpecificAreaName?: string;
  public RegionId: string;
  public TownId?: string;
  public ZoneId: string;
  public WoredaId: string;
  public KebeleId: string;
  public HouseNo?: string;
  public TeleNo?: string;
  public Pobox?: string;
  public Fax?: string;
  public CellPhoneNo?: string;
  public Email?: string;
  public IsIndustrialPark?: boolean;
  public IndustrialParkId?: number;
  public OtherAddress?: string;
  public Remark?: string;
  public Kebele?: KebeleModel;
  public Woreda?: WoredaModel;
  public Zone?: ZoneModel;
  public Region?: RegionModel;

  constructor(AddressId: number, ParentId: number, AddressType: number,
              IsMainOffice: boolean, SpecificAreaName: string, RegionId: string,
              TownId: string, ZoneId: string, WoredaId: string, KebeleId: string,
              HouseNo: string, TeleNo: string, Pobox: string, Fax: string,
              CellPhoneNo: string, Email: string, OtherAddress: string, Remark: string) {
    this.AddressId = AddressId;
    this.ParentId = ParentId;
    this.AddressType = AddressType;
    this.IsMainOffice = IsMainOffice;
    this.SpecificAreaName = SpecificAreaName;
    this.RegionId = RegionId;
    this.TownId = TownId;
    this.ZoneId = ZoneId;
    this.WoredaId = WoredaId;
    this.KebeleId = KebeleId;
    this.HouseNo = HouseNo;
    this.TeleNo = TeleNo;
    this.Pobox = Pobox;
    this.Fax = Fax;
    this.CellPhoneNo = CellPhoneNo;
    this.Email = Email;
    this.OtherAddress = OtherAddress;
    this.Remark = Remark;
  }
}
