import { Component, OnInit } from '@angular/core';

import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Observable } from 'rxjs';
import { TrackApiService } from 'src/app/core/api/track-api.service';

@Component({
    selector: 'sma-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
    constructor(
        private notificationsService: NotificationsService,
        private trackApiService: TrackApiService
    ) { }

    private file: File;
    private readonly maxUploadSize = 30 * 1000**2;

    fileChanged(file: File) {
        this.file = file;
    }

    uploadFile(playlistId: string, trackName: string): Observable<void> {
        if (this.file.size > this.maxUploadSize) {
            const maxUploadSizeMb = this.maxUploadSize / 1000**2;
            const error = `You can\'t upload file large than ${maxUploadSizeMb}`;
            this.notificationsService.error('Uploading', error);

            return;
        }

        return this.trackApiService.uploadFile(playlistId, trackName, this.file);
    }
}
