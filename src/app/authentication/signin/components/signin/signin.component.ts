import { Component, OnInit } from '@angular/core';

import { AuthenticationApiService } from '../../../../core/api/authentication-api.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Router } from '@angular/router';
import { SignInFormData } from '../../models/sign-in-form-data.model';

@Component({
  selector: 'sma-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(
    private authenticationApiService: AuthenticationApiService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    this.signInData = {
      username: null,
      password: null
    }
  }

  ngOnInit() {
  }

  signInData: SignInFormData;

  signIn() {
    this.authenticationApiService.signIn(this.signInData.username, this.signInData.password)
      .subscribe(
        () => {
          this.notificationsService.success('Signed in');
          this.router.navigate(['/home']);
        },
        error => this.notificationsService.httpError('Sign in', error)
      );
  }
}
