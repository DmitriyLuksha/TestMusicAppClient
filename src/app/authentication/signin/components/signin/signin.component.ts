import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { EventsService } from 'src/app/core/services/events.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Router } from '@angular/router';
import { SignInFormData } from '../../models/sign-in-form-data.model';
import UserDetailsChanged from 'src/app/core/events/userDetailsChanged.event';

@Component({
    selector: 'sma-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {
    constructor(
        private authenticationService: AuthenticationService,
        private notificationsService: NotificationsService,
        private router: Router,
        private eventsService: EventsService
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
        this.authenticationService
            .signIn(this.signInData.username, this.signInData.password)
            .subscribe(
                () => {
                    this.notificationsService.success('Signed in');
                    this.eventsService.broadcast(new UserDetailsChanged());
                    this.router.navigate(['/home']);
                },
                error => this.notificationsService.httpError('Sign in', error)
            );
    }
}
