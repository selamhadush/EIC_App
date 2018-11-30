import {LookupsModel} from '../lookups';
import {LookuptypesModel} from '../lookuptypes';

export class IncentiveRequestItemModel {
  public IncentiveRequestItemId: number;
  public ProjectId?: any;
  public IncentiveCategoryId: number;
  public IncentiveCategory: string;
  public IncentiveItemId: number;
  public IncentiveItem: string;
  public Amount: number;
  public MesurmentUnit?: number;
  public CurrencyType: number;
  public CurrencyRate?: number;
  public UnitId: number;
  public Quantity: number;
  public MotorNo: string;
  public ChassisNo: string;
  public IsApproved?: boolean;
  public ApprovedQty?: number;
  public RequestDate?: Date;
  public InvoiceNo: string;
  public Status?: boolean;
  public Lookup?: LookupsModel ;
  public LookupTypes?: LookuptypesModel ;

}
