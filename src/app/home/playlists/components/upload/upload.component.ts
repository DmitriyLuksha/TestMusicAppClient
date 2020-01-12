import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicUploadType } from 'src/app/core/enums/musicUploadType.enum';
import { UploadMusicFormData } from '../../models/upload-music-form-data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { UploadYoutubeComponent } from '../upload-youtube/upload-youtube.component';

@Component({
  selector: 'sma-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private notificationsService: NotificationsService,
        private router: Router
    ) {
        this.uploadMusicFormData = <UploadMusicFormData>{};
        this.uploadMusicFormData.selectedUploadType = this.uploadTypes[0].value;

        this.musicUploadType = MusicUploadType;
    }

    readonly uploadTypes = [
        {
            label: 'File',
            value: MusicUploadType.File
        },
        {
            label: 'YouTube',
            value: MusicUploadType.Youtube
        }
    ];

    uploadMusicFormData: UploadMusicFormData;
    musicUploadType = MusicUploadType;

    @ViewChild(UploadFileComponent, { static: false })
    uploadFileComponent: UploadFileComponent;

    @ViewChild(UploadYoutubeComponent, { static: false })
    uploadYoutubeComponent: UploadYoutubeComponent;

    ngOnInit() {
    }

    upload() {
        const playlistId = this.activatedRoute.snapshot.paramMap.get('playlistId');
        const trackName = this.uploadMusicFormData.name;

        let uploadingObservable: Observable<void>;

        if (this.uploadMusicFormData.selectedUploadType === MusicUploadType.File) {
            uploadingObservable = this.uploadFileComponent.uploadFile(playlistId, trackName);
        }
        else {
            uploadingObservable = this.uploadYoutubeComponent.uploadVideo(playlistId, trackName);
        }

        uploadingObservable.subscribe(
            () => {
                this.notificationsService.success('File placed in the queue');
                this.router.navigate(['../'], { relativeTo: this.activatedRoute });
            },
            error => this.notificationsService.httpError('File upload', error)
        );
    }
}
