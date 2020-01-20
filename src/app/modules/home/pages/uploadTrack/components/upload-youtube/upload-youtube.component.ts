import { Component } from '@angular/core';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Observable } from 'rxjs';
import { TrackApiService } from 'src/app/core/api/track-api.service';
import { YoutubeService } from 'src/app/core/services/youtube.service';

@Component({
    selector: 'sma-upload-youtube',
    templateUrl: './upload-youtube.component.html',
    styleUrls: ['./upload-youtube.component.scss']
})
export class UploadYoutubeComponent {
    constructor(
        private youtubeService: YoutubeService,
        private trackApiService: TrackApiService,
        private notificationsService: NotificationsService
    ) { }

    videoUrl: string;

    uploadVideo(playlistId: string, trackName: string): Observable<void> {
        const videoId = this.youtubeService.getVideoId(this.videoUrl);

        if (!videoId) {
            this.notificationsService.error('Uploading', 'Invalid URL');
            return;
        }

        return this.trackApiService.uploadYoutube(playlistId, trackName, videoId);
    }
}
