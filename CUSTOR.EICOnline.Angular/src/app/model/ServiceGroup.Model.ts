export class ServiceGroupModel {
  public ServiceName: string;
  public ServiceStatus: ServiceStatus[];

}

export class ServiceStatus {
  public StatusType: string;
  public Toatal: any;
}
