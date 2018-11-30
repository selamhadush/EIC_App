import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectStepperComponent } from './project-stepper/project-stepper.component';
import { ProjectProfileDetailComponent } from './project-profile-detail/project-profile-detail.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectProfileFormComponent } from './project-profile-form/project-profile-form.component';

const projectRouting: Routes = [
  {
    path: '', component: ProjectStepperComponent, children: [
      { path: 'new', component: ProjectStepperComponent },
      { path: 'detail/:id', component: ProjectProfileDetailComponent },
      { path: ':id/edit', component: ProjectProfileFormComponent }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(projectRouting)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ProjectRoutingModule {
}