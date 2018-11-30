import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-service-confirmation',
  templateUrl: './service-confirmation.component.html',
  styleUrls: ['./service-confirmation.component.scss']
})
export class ServiceConfirmationComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }
}
