import { Component, OnInit } from '@angular/core';
import { MusicUploadType } from 'src/app/core/enums/musicUploadType.enum';
import { UploadMusicFormData, UploadMusicFormFileData } from '../../models/upload-music-form-data.model';
import { PlaylistApiService } from 'src/app/core/api/playlist-api.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/core/services/notifications.service';

@Component({
  selector: 'sma-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    constructor(
        private playlistApiService: PlaylistApiService,
        private activatedRoute: ActivatedRoute,
        private notificationsService: NotificationsService
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

    uploadMusicFormData: UploadMusicFormData;
    musicUploadType = MusicUploadType;

    ngOnInit() {
    }

    fileChanged(file: File) {
        this.uploadMusicFormData.fileUploadData.file = file;
    }

    upload() {
        const playlistId = this.activatedRoute.snapshot.paramMap.get('playlistId');

        this.playlistApiService.uploadMusicFile(playlistId,
                this.uploadMusicFormData.name,
                this.uploadMusicFormData.fileUploadData.file)
            .subscribe(
                () => this.notificationsService.success('File uploaded'),
                error => this.notificationsService.httpError('File upload', error)
            )
    }
}
