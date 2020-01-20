import { Component, ViewChild } from '@angular/core';

import { AccountApiService } from '../../../../core/api/account-api.service';
import { FormGroup } from '@angular/forms';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { RegistrationFormData } from './models/registration-form-data.model'
import { Router } from '@angular/router';

@Component({
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss']
})
export class RegistrationPage {
    constructor(
            private accountApiService: AccountApiService,
            private notificationsService: NotificationsService,
            private router: Router
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
            this.accountApiService.isUsernameUnique(this.registrationData.username)
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
            this.accountApiService.isEmailUnique(this.registrationData.email)
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
        this.accountApiService
            .registerUser(this.registrationData.username,
                this.registrationData.email,
                this.registrationData.password)
            .subscribe(
                () => {
                    this.notificationsService.success('Registered')
                    this.isRegistrationWaiting = false;
                    
                    this.router.navigate(['/authentication/signin']);
                },
                error => this.notificationsService.httpError('Registration', error)
            );
    }
}
