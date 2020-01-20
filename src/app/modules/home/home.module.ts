import { AddPlaylistPage } from './pages/addPlaylist/add-playlist.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageModule } from './pages/home/home-page.module';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { PlaylistPage } from './pages/playlist/playlist.page';
import { TracksGridComponent } from './components/tracks-grid/tracks-grid.component';
import { UploadTrackPageModule } from './pages/uploadTrack/upload-track-page.module';

@NgModule({
    declarations: [
        AddPlaylistPage,
        PlaylistPage,
        TracksGridComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        HomePageModule,
        UploadTrackPageModule
    ]
})
export class HomeModule { }
