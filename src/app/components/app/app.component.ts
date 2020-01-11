import { Component } from '@angular/core';
import { NotificationConnection } from '../../core/connections/notification.connection';

@Component({
    selector: 'sma-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private notificationConnection: NotificationConnection
    ) { }

    title = 'TestMusicAppClient';
    notificationOptions = {
        timeOut: 5000,
        pauseOnHover: false
    }
}
