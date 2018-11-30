import {Component} from '@angular/core';
import {fadeInOut} from '../../../@custor/services/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.scss'],
  animations: [fadeInOut]
})
export class AccessDeniedComponent {
  constructor(
    private router: Router) {

  }

  goHome() {
    // window.history.back();
    this.router.navigate(['home']);
  }
}
