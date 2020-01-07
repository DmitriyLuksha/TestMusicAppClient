import { Component, OnInit } from '@angular/core';
import { MusicUploadType } from 'src/app/core/enums/musicUploadType.enum';
import { UploadMusicFormData, UploadMusicFormFileData } from '../../models/upload-music-form-data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { TrackApiService } from 'src/app/core/api/track-api.service';

@Component({
  selector: 'sma-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    constructor(
        private trackApiService: TrackApiService,
        private activatedRoute: ActivatedRoute,
        private notificationsService: NotificationsService,
        private router: Router,
    ) {
        this.uploadMusicFormData = <UploadMusicFormData>{};
        this.uploadMusicFormData.selectedUploadType = this.uploadTypes[0].value;
        this.uploadMusicFormData.fileUploadData = <UploadMusicFormFileData>{};

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

    private readonly maxUploadSize = 30 * 1000**2;

    uploadMusicFormData: UploadMusicFormData;
    musicUploadType = MusicUploadType;

    ngOnInit() {
    }

    fileChanged(file: File) {
        this.uploadMusicFormData.fileUploadData.file = file;
    }

    upload() {
        if (this.uploadMusicFormData.fileUploadData.file.size > this.maxUploadSize) {
            const maxUploadSizeMb = this.maxUploadSize / 1000**2;
            const error = `You can\'t uplaod file large than ${maxUploadSizeMb}`;
            this.notificationsService.error('File uploading', error);

            return;
        }

        const playlistId = this.activatedRoute.snapshot.paramMap.get('playlistId');

        this.trackApiService.uploadFile(playlistId,
                this.uploadMusicFormData.name,
                this.uploadMusicFormData.fileUploadData.file)
            .subscribe(
                () => {
                    this.notificationsService.success('File placed in the queue');
                    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
                },
                error => this.notificationsService.httpError('File upload', error)
            );
    }
}
