import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { TracksGridComponent } from './components/tracks-grid/tracks-grid.component';
import { UploadComponent } from './components/upload/upload.component';

@NgModule({
    declarations: [AddPlaylistComponent, PlaylistComponent, UploadComponent, TracksGridComponent],
    imports: [
        CommonModule,
        PlaylistsRoutingModule,
        FormsModule
    ]
})
export class PlaylistsModule { }
