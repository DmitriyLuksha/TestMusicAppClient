import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { UploadComponent } from './components/upload/upload.component';
import { SHOW_SELECTED_PLAYLIST } from '../constants/route-data-keys';


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
                data: {
                    [SHOW_SELECTED_PLAYLIST]: true
                }
            },
            {
                path: ':playlistId/upload',
                component: UploadComponent,
                data: {
                    [SHOW_SELECTED_PLAYLIST]: true
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
