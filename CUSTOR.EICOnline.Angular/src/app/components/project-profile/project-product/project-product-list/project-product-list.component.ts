import {Component, OnInit} from '@angular/core';
import {ProjectOutputService} from '../../../../Services/project-output.service';
import {ProjectOutputModel} from '../../../../model/ProjectOutput.model';

@Component({
  selector: 'app-project-product-list',
  templateUrl: './project-product-list.component.html',
  styleUrls: ['./project-product-list.component.scss']
})
export class ProjectProductListComponent implements OnInit {
  public productList: ProjectOutputModel[];
  public plannedProductList: ProjectOutputModel;

  constructor(public productService: ProjectOutputService) {
  }

  ngOnInit() {
    this.getProductAfterCare();
    this.getPlannedProduct();
  }

  getProductAfterCare() {
    this.productService.getPOutActual(localStorage.getItem('ProjectId'))
      .subscribe(result => {
        this.productList = result;
      });
  }

  getPlannedProduct() {
    this.productService.getPOutPutByProject(localStorage.getItem('ProjectId'))
      .subscribe(result => {
        this.plannedProductList = result[0];
      });
  }

}
