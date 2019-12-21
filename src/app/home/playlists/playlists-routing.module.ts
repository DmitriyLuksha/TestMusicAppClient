import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';
import { PlaylistComponent } from './components/playlist/playlist.component';


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
                component: PlaylistComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
