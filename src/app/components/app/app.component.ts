import { Component } from '@angular/core';
import { NotificationConnection } from '../../core/connections/notification.connection';
import { TelemetryService } from 'src/app/core/services/telemetry.service';

@Component({
    selector: 'sma-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
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
