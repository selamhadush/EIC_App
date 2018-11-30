import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '@custor/services/security/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;
  zoom = 14;
  lat = 9.011805;
  lng = 38.756546;
  // AA 8.9806° N, 38.7578° E
  markers: marker[] = [
    {
      lat: 9.0049,
      lng: 38.7671,
      label: 'EIC',
      draggable: false
    }
  ];

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private authService: AuthService) {
    this.loginFormErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  DoLogin() {
    if (this.authService.isLoggedIn) {
      this.logout();
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    this.authService.logout();
    this.authService.redirectLogoutUser();
  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }
}
