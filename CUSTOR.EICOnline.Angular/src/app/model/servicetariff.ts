import {TariffModel} from './tariff';

export class ServiceTariffModel {
  public ServiceTariffId?: number;
  public ServiceId: number;
  public TariffId: number[];
  public Fee?: number;
  public NameEnglish?: string;
  public Tariff?: TariffModel;

  constructor(serviceTariffId?: number, serviceId?: number, TariffId?: number[], NameEnglish?: string, fee?: number, TariffIdName?: TariffModel) {
    this.ServiceTariffId = serviceTariffId;
    this.ServiceId = serviceId;
    this.TariffId = TariffId;
    this.NameEnglish = NameEnglish;
    this.Fee = fee;
    //this.Tariff = TariffIdName;
  }
}
export class ServiceTariffViewModel {
  public ServiceTariffId?: number;
  public ServiceId: number;
  public TariffId: number;
  public Fee?: number;
  public NameEnglish?: string;
  public Tariff?: TariffModel;
}