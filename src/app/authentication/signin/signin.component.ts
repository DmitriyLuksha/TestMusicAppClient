import { Component, OnInit } from '@angular/core';

import { AuthenticationApiService } from '../authentication-api.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SignInFormData } from './models/sign-in-form-data.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(
    private authenticationApiService: AuthenticationApiService,
    private notificationsService: NotificationsService
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
        () => this.notificationsService.success('Signed in'),
        error => this.notificationsService.httpError('Sign in', error)
      );
  }
}
