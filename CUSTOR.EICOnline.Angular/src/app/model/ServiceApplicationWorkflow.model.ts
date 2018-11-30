import {ServiceWorkflowModel} from './ServiceWorkflow.model';

export class ServiceApplicationWorkflowModel {
  public ServiceApplicationWorkflowId: string;
  public ServiceWorkflowId: string;
  public ServiceApplicationId: string;
  public StartDate: string;
  public EndDate: string;
  public ServiceWorkflow?: ServiceWorkflowModel[];
}