import {Component, OnInit} from '@angular/core';
import {ProjectEmploymentService} from '../../../../Services/project-employment.service';
import {ProjectEmploymentModel} from '../../../../model/ProjectEmployment.model';

@Component({
  selector: 'app-project-employment-list',
  templateUrl: './project-employment-list.component.html',
  styleUrls: ['./project-employment-list.component.scss']
})
export class ProjectEmploymentListComponent implements OnInit {
  public employmentList: ProjectEmploymentModel[];
  public plannedEmploymentList: ProjectEmploymentModel;

  constructor(public employmentService: ProjectEmploymentService) {
  }

  ngOnInit() {
    this.getEmploymentAfterCare();
    this.getPlannedEmployment();
  }

  getEmploymentAfterCare() {
    this.employmentService.getAllActualEmployment(localStorage.getItem('ProjectId'))
      .subscribe(result => {
        this.employmentList = result;
      });
  }

  getPlannedEmployment() {
    this.employmentService.employmentByProject(localStorage.getItem('ProjectId'))
      .subscribe(result => {
        this.plannedEmploymentList = result;
      });
  }
}
