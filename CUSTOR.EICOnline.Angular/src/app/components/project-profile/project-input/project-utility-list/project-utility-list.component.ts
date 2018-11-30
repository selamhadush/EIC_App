import {Component, OnInit} from '@angular/core';
import {ProjectRequirementService} from '../../../../Services/project-requirement.service';
import {ProjectRequirementModel} from '../../../../model/ProjectRequirement.model';

@Component({
  selector: 'app-project-utility-list',
  templateUrl: './project-utility-list.component.html',
  styleUrls: ['./project-utility-list.component.scss']
})
export class ProjectUtilityListComponent implements OnInit {
  public utilityList: ProjectRequirementModel[];
  public plannedUtilityList: ProjectRequirementModel;

  constructor(public utilityService: ProjectRequirementService) {
  }

  ngOnInit() {
    this.getUtility();
    this.getPlannedUtility();
  }

  getUtility() {
    this.utilityService.getAll()
      .subscribe(result => {
        this.utilityList = result;
      });
  }

  getPlannedUtility() {
    this.utilityService.getAll()
      .subscribe(result => {
        this.plannedUtilityList = result[0];
      });
  }
}
