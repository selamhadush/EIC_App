import {Component, OnInit} from '@angular/core';
import {ProjectCostService} from '../../../../Services/project-cost.service';
import {ProjectCostModel} from '../../../../model/ProjectCost.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-cost-list',
  templateUrl: './project-cost-list.component.html',
  styleUrls: ['./project-cost-list.component.scss']
})
export class ProjectCostListComponent implements OnInit {
  public costList: ProjectCostModel[];
  public plannedCost: ProjectCostModel;

  constructor(public projectCostService: ProjectCostService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllCostByProjectId();
    this.getPlannedCostByProjectId();
  }

  getAllCostByProjectId() {
    this.projectCostService.getAllActualCost(localStorage.getItem('ProjectId'))
      .subscribe(cost => {
        this.costList = cost;
      });

  }

  getPlannedCostByProjectId() {
    this.projectCostService.getCostByProjectId(localStorage.getItem('ProjectId'))
      .subscribe(cost => {
        console.log(cost);
        this.plannedCost = cost;
      });

  }

  edit(costId: any) {
    this.router.navigate(['/project-cost/new', costId]);
  }

  back() {
    window.history.back();
  }
}
