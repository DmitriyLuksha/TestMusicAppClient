import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { EventsService } from '../services/events.service';
import { Injectable } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import TrackUploadFinishedEvent from '../events/trackUploadFinished.event';
import { environment } from '../../../environments/environment';

@Injectable()
export class NotificationConnection {
    constructor(
        private notificationsService: NotificationsService,
        private eventsService: EventsService
    ) {
        this.initializeConnection();
    }
    
    private hubConnection: HubConnection;

    private initializeConnection() {  
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(environment.signalRUrl + '/notifications')  
            .build();
        
        this.hubConnection.on('notification', (message: any) => {  
            const eventType = this.registeredEvents[message.notificationName];

            if (!eventType) {
                console.log(`Unknown notification name: ${message.notificationName}`);
                return;
            }

            let eventObject = new eventType();
            Object.assign(eventObject, message);

            this.eventsService.broadcast(eventObject);
        }); 

        this.hubConnection.start()
            .then(() => { })
            .catch(err => {
                this.notificationsService.error('Notifications connection',
                    'Can\'t establish notifications connection. Please, try to reload the page')
            });
            
    }

    private registeredEvents = {
        TrackUploadFinishedNotificationMessage: TrackUploadFinishedEvent
    };
}