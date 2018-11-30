import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  onProjectList() {
    console.log(this.router.url);
    this.router.navigate(['../list'], { relativeTo: this.route });
  }

  onNewProject() {
    console.log(this.router.url);
    this.router.navigate(['../new'], { relativeTo: this.route });
  }
}