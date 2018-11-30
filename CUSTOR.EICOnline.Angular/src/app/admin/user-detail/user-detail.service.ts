import {Injectable} from '@angular/core';
import {UserDetailModel} from './UserDetail.model';

@Injectable({
  providedIn: 'root'
})
export class UserActivityDataServices {
  userDetail: UserDetailModel;

  constructor() {
    this.userDetail = new UserDetailModel();
  }

  getAllActivityData() {
    this.setActivityData();

    return this.userDetail;
  }

  setActivityData(projectId?: number, serviceApplicationId?: number, serviceId?: number): UserDetailModel {
    this.userDetail.Project = localStorage.getItem('ProjectId');
    this.userDetail.ServiceApplicationId = localStorage.getItem('ServiceApplicationId');
    this.userDetail.ServiceId = localStorage.getItem('ServiceId');
    return this.userDetail;
  }

  // setActivityData(projectId?: number, serviceApplicationId?: number, serviceId?: number): UserDetailModel {
  //
  //   this.userDetail.Project = (projectId === null) ? localStorage.getItem('ProjectId') : projectId;
  //   this.userDetail.ServiceApplicationId = (serviceApplicationId === null) ? localStorage.getItem('ServiceApplicationId') : serviceApplicationId;
  //   this.userDetail.ServiceId = (serviceId === null) ? localStorage.getItem('ServiceId') : serviceId;
  //   return this.userDetail;
  // }
}