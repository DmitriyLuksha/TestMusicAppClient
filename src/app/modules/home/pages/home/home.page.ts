import { Component, OnDestroy, OnInit } from '@angular/core';

import { EventsService } from 'src/app/core/services/events.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import TrackUploadFinished from 'src/app/core/events/trackUploadFinished.event';

@Component({
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
    constructor(
        private eventsService: EventsService,
        private notificationsService: NotificationsService
    ) { }

    ngOnInit() {
        // TODO Think where to move it
        // These notifications should be visible inside all home routes
        this.eventsService.on(TrackUploadFinished, this.trackUploadFinishedFinished, this);
    }

    ngOnDestroy() {
        this.eventsService.off(TrackUploadFinished,this.trackUploadFinishedFinished);
    }

    private trackUploadFinishedFinished(event: TrackUploadFinished) {
        if (event.isSuccess) {
            this.notificationsService.success('Track uploading', `Track ${event.trackName} uploading finished`);
        }
        else {
            this.notificationsService.error('Track uploading', `Track ${event.trackName} can't be uploaded`);
        }
    }
}
