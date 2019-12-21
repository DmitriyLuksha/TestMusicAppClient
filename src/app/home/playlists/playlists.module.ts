import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from './components/upload/upload.component';


@NgModule({
    declarations: [AddPlaylistComponent, PlaylistComponent, UploadComponent],
    imports: [
        CommonModule,
        PlaylistsRoutingModule,
        FormsModule
    ]
})
export class PlaylistsModule { }
