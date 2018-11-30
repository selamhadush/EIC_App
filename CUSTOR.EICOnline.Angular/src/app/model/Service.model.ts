import { ServiceTariffModel } from './servicetariff';

export class ServiceModel {
  public ServiceId: number;
  public Name: string;
  public NameEnglish: string;
  public DisplayName: string;
  public DisplayNameEnglish: string;
  public Abbreviation: string;
  public Icon: string;
  public Duration: number;
  public DurationUnitId: number;
  public IsActive: boolean;
  public IsDeleted: boolean;
  public EventDatetime: Date;
  public CreatedUserId: number;
  public CreatedUserName: string;
  public UpdatedEventDatetime: Date;
  public UpdatedUserId: number;
  public UpdatedUserName: string;
  public ServiceTariff?: ServiceTariffModel[];
  // public ObjectId: Guid;
  // public DurationUnit: Lookup;
  // public ServiceApplication: ICollection<ServiceApplication>;
  // public ServiceSite: ICollection<ServiceSite>;
  // public ServiceStep: ICollection<ServiceStep>;
  // public ServiceTariff: ICollection<ServiceTariff>;
  // public ServiceWorkflow: ICollection<ServiceWorkflow>;
}