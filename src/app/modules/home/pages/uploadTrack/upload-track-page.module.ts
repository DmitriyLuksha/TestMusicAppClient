import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadTrackPage } from './upload-track.page';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { UploadYoutubeComponent } from './components/upload-youtube/upload-youtube.component';

@NgModule({
    declarations: [
        UploadTrackPage,
        UploadFileComponent,
        UploadYoutubeComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        UploadTrackPage
    ]
})
export class UploadTrackPageModule { }
