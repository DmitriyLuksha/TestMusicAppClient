import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                // TODO Maybe move modules for the same path in a same folder?
                path: 'playlists',
                children: [
                   {
                        path: 'add',
                        loadChildren: () => import('./add-playlist/add-playlist.module')
                            .then(m => m.AddPlaylistModule)
                   },
                   {
                       path: ':playlistId',
                       loadChildren: () => import('./playlist/playlist.module')
                            .then(m => m.PlaylistModule)
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
