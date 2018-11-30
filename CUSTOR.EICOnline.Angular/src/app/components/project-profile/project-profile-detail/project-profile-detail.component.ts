import {Component, OnInit} from '@angular/core';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {ProjectModel} from '../../../model/Project.model';
import {ProjectCostModel} from '../../../model/ProjectCost.model';
import {ProjectEmploymentModel} from '../../../model/ProjectEmployment.model';
import {ProjectOutputModel} from '../../../model/ProjectOutput.model';
import {ProjectRequirementModel} from '../../../model/ProjectRequirement.model';
import {ProjectNationalityCompositionModel} from '../../../model/ProjectNationalityComposition.model.';
import {ProjectInputModel} from '../../../model/ProjectInput.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProjectCostService} from '../../../Services/project-cost.service';
import {ProjectRequirementService} from '../../../Services/project-requirement.service';
import {ProjectInputService} from '../../../Services/project-input.service';
import {ProjectNationalityCompositionService} from '../../../Services/project-nationality-composition.service';
import {ProjectEmploymentService} from '../../../Services/project-employment.service';
import {ProjectOutputService} from '../../../Services/project-output.service';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {AddressModel} from '../../../model/address/Address.model';
import {AddressService} from '../../../Services/Address/address.service';
import {ErrorMessage} from '../../../../@custor/services/errMessageService';
import {ProjectStageModel, ProjectStatusModel, QuarterModel} from "../../../model/lookupData";
import {ProjectStage, ProjectStatus, Quarter} from "@custor/const/consts";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-project-profile-detail',
  templateUrl: './project-profile-detail.component.html',
  styleUrls: ['./project-profile-detail.component.css']
})
export class ProjectProfileDetailComponent implements OnInit {
  projectDetail: ProjectModel;
  addressList: AddressModel;
  projectCost: ProjectCostModel;
  projectEmployement: ProjectEmploymentModel;
  projectOutput: ProjectOutputModel[];
  projectRequirement: ProjectRequirementModel;
  projectShare: ProjectNationalityCompositionModel[] = [];
  projectInputs: ProjectInputModel[] = [];
  projectId: number;
  public investorName: string;

  projectStatus: ProjectStatusModel[] = [];
  projectStage: ProjectStageModel[] = [];
  public projectStatusItem: ProjectStatusModel;
  public projectStageItem: ProjectStageModel;

  constructor(private projectProfileService: ProjectProfileService,
              private router: Router,
              private route: ActivatedRoute,
              private errMsg: ErrorMessage,
              private addressService: AddressService,
              private dataSharingService: DataSharingService,
              private projectCostService: ProjectCostService,
              private projectOutputService: ProjectOutputService,
              private projectInputService: ProjectInputService,
              private projectEmploymentService: ProjectEmploymentService,
              private projectRequirementService: ProjectRequirementService,
              private nationalityCompositionService: ProjectNationalityCompositionService) {
    this.projectStageItem = new ProjectStageModel();
    this.projectStatusItem = new ProjectStatusModel();
  }

  ngOnInit() {

    this.getProjectId();
    this.investorName = localStorage.getItem('investorName');
  }

  getProjectId() {
    this.route.params
      .subscribe((params: Params) => {
        this.projectId = +params['id'];
        this.getProjectDetail(this.projectId);
        this.getAddress(this.projectId);
      });
  }


  getProjectStatus(id: any) {
    let projectStatus1: ProjectStatusModel = new ProjectStatusModel();
    ProjectStatus.forEach(pair => {
      if (pair.Id == id) {
        projectStatus1 = {
          'Id': pair.Id.toString(),
          'DescriptionEnglish': pair.DescriptionEnglish,
          'Description': pair.Description

        };
        this.projectStatusItem = projectStatus1;
      }


    });
  }

  getProjectStage(id: any) {
    let projectSage: ProjectStageModel = new ProjectStageModel();
    ProjectStage.forEach(pair => {
      if (pair.Id == id) {
        projectSage = {
          'Id': pair.Id.toString(),
          'DescriptionEnglish': pair.DescriptionEnglish,
          'Description': pair.Description
        };
        this.projectStageItem = projectSage;

      }

    });


  }

  getAddress(parent: number) {
    this.addressService.getAddress(parent)
      .subscribe((result: AddressModel) => {
        this.addressList = result;
        console.log(this.addressList);
      }, error => this.errMsg.getError(error));
  }

  getProjectDetail(projectId: number) {
    this.projectProfileService.ProjectsDetail(projectId).subscribe(result => {
      this.projectDetail = result;
      this.projectCost = result.ProjectCost[0];
      this.projectEmployement = result.ProjectEmployment[0];
      this.projectOutput = result.ProjectOutput;
      this.projectRequirement = result.ProjectRequirement[0];
      this.projectShare = result.ProjectNationalityComposition;
      this.projectInputs = result.ProjectInput;

      this.getProjectStatus(result.ProjectStatus)
      this.getProjectStage(result.ProjectStage)
    }, error => this.errMsg.getError(error));
  }

  onProjectList() {
    console.log(this.router.url);
    this.router.navigate(['../../list'], {relativeTo: this.route});
  }

  onNewProject() {
    console.log(this.router.url);
    this.router.navigate(['../../new'], {relativeTo: this.route});
  }

  onDelete(type: string, id: number) {
    const response = confirm(`Do you want to Delete this ${type} ?`);
    if (response === true) {
      switch (type) {
        case 'cost':
          this.projectCostService.delete(id)
            .subscribe(() => {
              this.getProjectId();
            });
          break;
        case 'address':
          this.projectCostService.delete(id)
            .subscribe(() => {
              this.getProjectId();
            });
          break;
        case 'Utility':
          this.projectRequirementService.delete(id)
            .subscribe(() => {
              this.getProjectId();
            });
          break;
        case 'Employment':
          this.projectEmploymentService.delete(id)
            .subscribe(() => {
              // this.getAllProject();
            });
          break;
        case 'Output':
          this.projectOutputService.delete(id)
            .subscribe(() => {
              this.getProjectId();
            });
          break;
        case 'Input':
          this.projectInputService.delete(id)
            .subscribe(() => {
              // this.getAllProject();
            });
          break;
        case 'nationalityComposition':
          this.nationalityCompositionService.delete(id)
            .subscribe(() => {
              this.getProjectId();
            });
          break;
      }
      return true;
    } else {
      return false;
    }
  }

  editProject(stepperIndex: number, projectId: any) {
    setTimeout(() => this.dataSharingService.startingEditingProject.next(this.projectDetail), 0);
    setTimeout(() => this.dataSharingService.steeperIndex.next(stepperIndex), 0);

    this.router.navigate(['/pro', projectId], {relativeTo: this.route});
  }

  back() {
    window.history.back();
  }
}
