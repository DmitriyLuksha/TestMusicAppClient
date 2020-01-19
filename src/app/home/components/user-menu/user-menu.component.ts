import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { EventsService } from 'src/app/core/services/events.service';
import { Router } from '@angular/router';
import UserDetailsChanged from 'src/app/core/events/userDetailsChanged.event';

@Component({
    selector: 'sma-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private eventsService: EventsService
    ) { }

    ngOnInit() {
    }

    signOut() {
        this.authenticationService
            .signOut()
            .subscribe(() => {
                this.eventsService.broadcast(new UserDetailsChanged());
                this.router.navigate(['/authentication/signin']);
            });
    }
}
