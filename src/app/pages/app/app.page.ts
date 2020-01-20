import { Component } from '@angular/core';
import { NotificationConnection } from '../../core/connections/notification.connection';
import { TelemetryService } from 'src/app/core/services/telemetry.service';

@Component({
    selector: 'sma-root',
    templateUrl: './app.page.html',
    styleUrls: ['./app.page.scss']
})
export class AppComponent {
    constructor(
        private notificationConnection: NotificationConnection,
        private telemetryService: TelemetryService
    ) { }

    title = 'TestMusicAppClient';
    notificationOptions = {
        timeOut: 5000,
        pauseOnHover: false
    }
}
