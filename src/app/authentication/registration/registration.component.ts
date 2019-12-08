import { Component, ViewChild } from '@angular/core';

import { AuthenticationApiService } from '../authentication-api.service';
import { FormGroup } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RegistrationFormData } from './models/registration-form-data.model'

@Component({
  selector: 'sma-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(
      private authenticationApiService: AuthenticationApiService,
      private notificationsService: NotificationsService
    ) {
      
    this.registrationData = {
      username: null,
      email: null,
      password: null,
      confirmPassword: null
    };
  }
 
  registrationData: RegistrationFormData;

  isUsernameTaken: boolean;
  isEmailTaken?: boolean;

  isRegistrationWaiting: boolean;

  @ViewChild('registrationForm', { static: false })
  registrationForm: FormGroup;

  registerUser() {
    if (this.registrationData.password != this.registrationData.confirmPassword) {
      this.notificationsService.error('Registration', 'Passwords do not match')
      return;
    }

    let isValid = true;

    if (this.isUsernameTaken == null) {
      this.checkUsernameUniqueness();
      isValid = false;
    }

    if (this.isEmailTaken == null) {
      this.checkEmailUniqueness();
      isValid = false;
    }

    if (isValid) {
      this.sendRegistrationRequest();
    }
    else {
      this.isRegistrationWaiting = true;
    }
  }

  checkUsernameUniqueness() {
    if (this.isUsernameTaken !== null) {
      return;
    }

    if (this.registrationData.username) {
      this.authenticationApiService.isUsernameUnique(this.registrationData.username)
        .subscribe(
          isUnique => {
            this.isUsernameTaken = !isUnique;
            this.onUniquenessCheckOver();
          },
          error => this.notificationsService.httpError('Registration', error)
        );
    }
  }

  checkEmailUniqueness() {
    if (this.isEmailTaken !== null) {
      return;
    }
    
    if (this.registrationData.email) {
      this.authenticationApiService.isEmailUnique(this.registrationData.email)
        .subscribe(
          isUnique => {
            this.isEmailTaken = !isUnique;
            this.onUniquenessCheckOver();
          },
          error => this.notificationsService.httpError('Registration', error)
        );
    }
  }

  onUsernameInputChanged() {
    this.isUsernameTaken = null
  }

  onEmailInputChanged() {
    this.isEmailTaken = null
  }

  private onUniquenessCheckOver() {
    if (this.isRegistrationWaiting
          && this.isEmailTaken === false
          && this.isUsernameTaken === false
          && this.registrationForm.valid) {
            
      this.sendRegistrationRequest();
      this.isRegistrationWaiting = false;
    }
    else {
      this.isRegistrationWaiting = false;
    }
  }

  private sendRegistrationRequest() {
    this.authenticationApiService
      .registerUser(this.registrationData.username,
        this.registrationData.email,
        this.registrationData.password)
      .subscribe(
        () => {
          this.notificationsService.success('Registered')
          this.isRegistrationWaiting = false;
          this.isUsernameTaken = null;
          this.isEmailTaken = null;
        },
        error => this.notificationsService.httpError('Registration', error)
      );
  }
}
