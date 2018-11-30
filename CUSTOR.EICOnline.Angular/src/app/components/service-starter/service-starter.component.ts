import { Component } from '@angular/core';
import { fadeInOut } from '../../../@custor/services/animations';

@Component({
    selector: 'app-service-starter',
    templateUrl: './service-starter.component.html',
    styleUrls: ['./service-starter.component.scss'],
    animations: [fadeInOut]
})
export class ServiceStarterComponent {
}