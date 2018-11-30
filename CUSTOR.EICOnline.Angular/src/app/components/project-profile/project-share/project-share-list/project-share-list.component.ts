import {Component, OnInit} from '@angular/core';
import {ProjectNationalityCompositionService} from '../../../../Services/project-nationality-composition.service';
import {ProjectNationalityCompositionModel} from '../../../../model/ProjectNationalityComposition.model.';

@Component({
  selector: 'app-project-share-list',
  templateUrl: './project-share-list.component.html',
  styleUrls: ['./project-share-list.component.scss']
})
export class ProjectShareListComponent implements OnInit {
  public shareList: ProjectNationalityCompositionModel[];
  public plannedShareList: ProjectNationalityCompositionModel;

  constructor(public shareService: ProjectNationalityCompositionService) {
  }

  ngOnInit() {
    this.getShareAfterCare();
    this.getPlannedShareAfterCare();
  }

  getShareAfterCare() {
    this.shareService.getAll()
      .subscribe(result => {
        this.shareList = result;
      });
  }

  getPlannedShareAfterCare() {
    this.shareService.getAll()
      .subscribe(result => {
        this.plannedShareList = result[0];
      });
  }
}
