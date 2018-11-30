import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ProjectStageModel, ProjectStatusModel, QuarterModel} from '../../../../model/lookupData';
import {ProjectStage, ProjectStatus, Quarter} from '@custor/const/consts';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectProfileService} from '../../../../Services/project-profile.service';
import {ToastrService} from 'ngx-toastr';
import {ProjectStatusHistoryService} from '../../../../Services/project-status-history.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements OnInit, AfterContentChecked {

  projectStatus: ProjectStatusModel[] = [];
  projectStage: ProjectStageModel[] = [];
  projectStatusForm: FormGroup;
  public Quarter: QuarterModel[] = [];

  constructor(public fb: FormBuilder,
              private toast: ToastrService,
              private projectStatusHistoryService: ProjectStatusHistoryService,
              private projectService: ProjectProfileService) {
  }

  ngOnInit() {
    this.formBuild();
    this.initStaticData('en');
  }

  private formBuild() {
    this.projectStatusForm = this.fb.group({
      ProjectId: '',
      ProjectStatus: '',
      ProjectStage: '',
      RegistrationYear: '',
      Quarter: ''
    });
  }

  initStaticData(currentLang) {

    let projectStatus1: ProjectStatusModel = new ProjectStatusModel();
    ProjectStatus.forEach(pair => {
      projectStatus1 = {
        'Id': pair.Id.toString(), 'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.projectStatus.push(projectStatus1);
    });

    let projectSage: ProjectStageModel = new ProjectStageModel();
    ProjectStage.forEach(pair => {
      projectSage = {
        'Id': pair.Id.toString(), 'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.projectStage.push(projectSage);
    });

    let Quarter1: QuarterModel = new QuarterModel();
    Quarter.forEach(pair => {
      Quarter1 = {
        'Id': pair.Id.toString(),
        'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.Quarter.push(Quarter1);
    });

  }

  onSubmit() {

    this.projectStatusHistoryService.create(this.projectStatusForm.value)
      .subscribe(result => {
        this.toast.success('Project Status', 'Success');

      });

  }

  ngAfterContentChecked(): void {
    this.projectStatusForm.patchValue({
      ProjectId: localStorage.getItem('ProjectId')
    });
  }


}
