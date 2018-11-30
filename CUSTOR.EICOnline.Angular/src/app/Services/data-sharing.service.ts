import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ProjectModel} from '../model/Project.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  projectId = new Subject<any>();
  steeperIndex = new Subject<any>();
  renewalIndex = new Subject<any>();
  currentIndex = new BehaviorSubject(null);
  workFlowId = new Subject<any>();
  isNew = new Subject<boolean>();
  startingEditingProject = new Subject<ProjectModel>();
  serviceId = new Subject<any>();
  assignTask = new Subject<boolean>();
  investorTabSelectedIndex = new Subject<any>();
  isLoggedIn = new Subject<boolean>();
  // projectIdForEditing = new Subject<Number>();
  // startingUtil = new Subject<ProjectRequirementModel>();
  // startingCost = new Subject<ProjectCostModel>();
  // startingEditInput = new Subject<ProjectInputModel>();
  // startingEditProduct = new Subject<ProjectOutputModel>();
  // startingEmpl = new Subject<ProjectEmploymentModel>();
  // startingShare = new Subject<ProjectNationalityCompositionModel>();

  constructor() {
  }
}
