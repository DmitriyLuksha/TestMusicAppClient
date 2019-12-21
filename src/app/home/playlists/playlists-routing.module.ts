import { RouterModule, Routes } from '@angular/router';

import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';
import { NgModule } from '@angular/core';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SHOW_SELECTED_PLAYLIST } from '../constants/route-data-keys.constant';
import { UploadComponent } from './components/upload/upload.component';

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
        children: [
            {
                path: 'add',
                component: AddPlaylistComponent
            },
            {
                path: ':playlistId',
                component: PlaylistComponent,
                ...playlistRouteData
            },
            {
                path: ':playlistId/upload',
                component: UploadComponent,
                ...uploadRouteData
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
