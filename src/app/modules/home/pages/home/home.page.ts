import { Component, OnDestroy, OnInit } from '@angular/core';

import { EventNotificationService } from '../../service/event-notification.service';

@Component({
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
    constructor(
        private eventNotificationService: EventNotificationService
    ) { }

    ngOnInit() {
        this.eventNotificationService.attach();
    }

    ngOnDestroy() {
        this.eventNotificationService.detach();
    }
}
