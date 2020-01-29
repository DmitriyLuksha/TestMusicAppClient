import { Injectable, Type } from '@angular/core';

import { EventsService } from 'src/app/core/services/events.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import TrackUploadFinishedEvent from 'src/app/core/events/trackUploadFinished.event';

@Injectable()
export class EventNotificationService {
    constructor(
        private eventsService: EventsService,
        private notificationsService: NotificationsService
    ) {
    }
    
    attach() {
        this.eventsService.on(TrackUploadFinishedEvent, this.trackUploadFinishedFinished, this);
    }

    detach() {
        this.eventsService.off(TrackUploadFinishedEvent, this.trackUploadFinishedFinished);
    }

    private trackUploadFinishedFinished(event: TrackUploadFinishedEvent) {
        if (event.isSuccess) {
            this.notificationsService.success('Track uploading', `Track ${event.trackName} uploading finished`);
        }
        else {
            this.notificationsService.error('Track uploading', `Track ${event.trackName} can't be uploaded`);
        }
    }
}