import { RouterModule, Routes } from '@angular/router';

import { AddPlaylistPage } from './pages/addPlaylist/add-playlist.page';
import { HomePage } from './pages/home/home.page';
import { NgModule } from '@angular/core';
import { PlaylistPage } from './pages/playlist/playlist.page';
import { SHOW_SELECTED_PLAYLIST } from './constants/route-data-keys.constant';
import { UploadTrackPage } from './pages/uploadTrack/upload-track.page';

const playlistRouteData = {
    data: {
        [SHOW_SELECTED_PLAYLIST]: true
    }
}

const uploadRouteData = {
    data: {
        [SHOW_SELECTED_PLAYLIST]: true
    }
}

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'playlists',
                children: [
                    {
                        path: 'add',
                        component: AddPlaylistPage
                    },
                    {
                        path: ':playlistId',
                        component: PlaylistPage,
                        ...playlistRouteData
                    },
                    {
                        path: ':playlistId/upload',
                        component: UploadTrackPage,
                        ...uploadRouteData
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
