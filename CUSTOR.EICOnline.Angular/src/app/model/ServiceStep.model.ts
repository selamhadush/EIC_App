import { ServicePrerequisiteModel } from './service';

export class ServiceStepModel {
  public ServiceStepId: number;
  public Name: string;
  public NameEnglish: string;
  public LegalStatusId: number;
  public ServiceId: string;
  public IsActive: boolean;
  public Service?: ServicePrerequisiteModel;
}