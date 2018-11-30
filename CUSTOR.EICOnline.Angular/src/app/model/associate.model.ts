import {AddressModel} from './address/Address.model';
import {ProjectAssociateModel} from './ProjectAssociate.model';

export class AssociateDTO {
  constructor() {
  }

  public AssociateId: number;
  public Tin?: string;
  public Title?: number;
  public InvestorId?: any;
  public FirstName?: string;
  public FirstNameEng?: string;
  public FatherName?: string;
  public FatherNameEng?: string;
  public GrandName?: string;
  public GrandNameEng?: string;
  // public DateOfBirth?: Date;
  public Gender?: number;
  public Nationality?: number;
  public Origin?: number;
  public Photo?: number[];
  public Remark?: string;
  public AddressId?: number;
  public IsActive?: boolean;
  public selected?: boolean;
  public IsDeleted?: boolean;
  public Address?: AddressModel;
  public PhotoData?: string;
  RegionId: string = null;
  ZoneId: string = null;
  WoredaId: string = null;
  KebeleId: string = null;
  HouseNo: string = null;
  TeleNo: string = null;
  Pobox: string = null;
  Fax: string = null;
  CellPhoneNo: string = null;
  Email: string = null;
  OtherAddress: string = null;
 

}

export class AssociateModel {
  constructor() {
  }

  public AssociateId: number;
  public Tin?: string;
  public Title?: number;
  public InvestorId?: any;
  public FirstName?: string;
  public FirstNameSort?: string;
  public FirstNameSoundx?: string;
  public FirstNameEng?: string;
  public FatherName?: string;
  public FatherNameSort?: string;
  public FatherNameSoundx?: string;
  public FatherNameEng?: string;
  public GrandName?: string;
  public GrandNameSort?: string;
  public GrandNameSoundx?: string;
  public GrandNameEng?: string;
  public DateOfBirth?: Date;
  public Gender?: number;
  public Nationality?: number;
  public Origin?: number;
  public Photo?: number[];
  public Remark?: string;
  public AddressId?: number;
  public IsActive?: boolean;
  public selected?: boolean;
  public IsDeleted?: boolean;
  public EventDatetime?: Date;
  public CreatedUserId?: number;
  public CreatedUserName?: string;
  public UpdatedEventDatetime?: Date;
  public UpdatedUserId?: number;
  public UpdatedUserName?: string;
  public Address?: AddressModel;
  public projectAssociate?: ProjectAssociateModel;
  RegionId: string = null;
  ZoneId: string = null;
  WoredaId: string = null;
  KebeleId: string = null;
  HouseNo: string = null;
  TeleNo: string = null;
  Pobox: string = null;
  Fax: string = null;
  CellPhoneNo: string = null;
  Email: string = null;
  OtherAddress: string = null;
}